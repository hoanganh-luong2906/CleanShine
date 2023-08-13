package com.be.bill;

import com.be.dto.request.DateRequest;
import com.be.dto.response.AmountResponse;
import com.be.dto.response.BillInfoResponse;
import com.be.email.EmailDetail;
import com.be.email.EmailService;
import com.be.dto.request.BillCreateRequest;
import com.be.dto.request.BillUpdateRequest;
import com.be.mapper.BillMapper;
import com.be.room.RoomEntity;
import com.be.room.RoomRepository;
import com.be.service.ServiceEntity;
import com.be.service.ServiceRepository;
import com.be.service_detail.ServiceDetailEntity;
import com.be.service_detail.ServiceDetailRepository;
import com.be.status.BillStatus;
import com.be.status.Payment;
import com.be.user.UserEntity;
import com.be.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@AllArgsConstructor
public class BillService {
    private BillRepository billRepository;
    private UserRepository userRepository;
    private ServiceDetailRepository serviceDetailRepository;
    private EmailService emailService;

    private BillMapper billMapper;
    private RoomRepository roomRepository;

    private ServiceRepository serviceRepository;

    public void assignEmployee(BillUpdateRequest billUpdateRequest) {
        UserEntity employee = userRepository.findById(billUpdateRequest.getEmployeeId());
        BillEntity billEntity = billRepository.findById(billUpdateRequest.getBillId()).orElseThrow();
        billEntity.setEmployee(employee);
        billEntity.setBillStatus(BillStatus.ADMIN_ASSIGN);
        billRepository.save(billEntity);
    }


    public boolean createBill(BillCreateRequest request) {
        BillEntity bill = billRepository.getExistBill(request.getCustomerId(), request.getServiceDetailId());
        if (bill != null) {
            return false;
        }
        BillEntity billEntity = new BillEntity();
        UserEntity customer = userRepository.findById(request.getCustomerId());
        billEntity.setCustomer(customer);
        ServiceDetailEntity serviceDetail = serviceDetailRepository.findById(request.getServiceDetailId()).orElse(null);
        RoomEntity room = roomRepository.findById(request.getRoomId()).orElse(null);
        billEntity.setNote(request.getNote());
        billEntity.setRoom(room);
        billEntity.setServiceDetail(serviceDetail);
        LocalDate dateOrder = convertToDate(request.getDateOrder());
        LocalDate dateImp = convertToDate(request.getDateImplement());
        LocalTime timeStart = parseToLocalTime(request.getTimeStart());
        LocalTime timeEnd = parseToLocalTime(request.getTimeEnd());
        billEntity.setDateOrder(dateOrder);
        billEntity.setDateImplement(dateImp);
        billEntity.setTimeStart(timeStart);
        billEntity.setTimeEnd(timeEnd);
        billEntity.setCompleteStatus(false);
        if (request.getPayment().equals("PayPal")) {
            billEntity.setBillStatus(BillStatus.ADMIN_RECEIVED);
            billEntity.setPayment(Payment.PAYPAL);
        } else {
            billEntity.setBillStatus(BillStatus.CUSTOMER_UNPAID);
            billEntity.setPayment(Payment.COD);
        }
        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setRecipient(customer.getEmail());
        emailDetail.setSubject("Đặt hàng thành công!");
        emailDetail.setMsgBody("aaa");
        emailService.sendMailTemplate(emailDetail, serviceDetail.getName(), customer.getName());
        billRepository.save(billEntity);
        return true;
    }


    public boolean customerCancelBill(long id) {
        BillEntity bill = billRepository.findById(id).orElse(null);
        if (bill.getBillStatus() == BillStatus.CUSTOMER_UNPAID) {
            bill.setBillStatus(BillStatus.CUSTOMER_DENY);
            billRepository.save(bill);
            return true;
        }
        return false;
    }

    public boolean adminCancelBill(long id) {
        BillEntity bill = billRepository.findById(id).orElse(null);
        if (bill.getBillStatus() != BillStatus.STAFF_ACCEPT) {
            bill.setBillStatus(BillStatus.ADMIN_DENY);
            return true;
        }
        return false;
    }

    public void acceptAssign(long id) {
        BillEntity bill = billRepository.findById(id).orElse(null);
        bill.setBillStatus(BillStatus.STAFF_ACCEPT);
        billRepository.save(bill);
    }

    public void denyAssign(long id) {
        BillEntity bill = billRepository.findById(id).orElse(null);
        bill.setEmployee(null);
        bill.setBillStatus(BillStatus.STAFF_DENY);
        billRepository.save(bill);
    }

    public void confirmComplete(long id) {
        BillEntity bill = billRepository.findById(id).orElse(null);
        bill.setCompleteStatus(true);
        if (bill.getPayment() == Payment.PAYPAL) {
            bill.setBillStatus(BillStatus.ADMIN_RECEIVED);
        } else {
            bill.setBillStatus(BillStatus.STAFF_RECEIVED);
        }
        billRepository.save(bill);
    }

    public List<BillInfoResponse> getEmployeeHistory(long id) {
        List<BillEntity> list = billRepository.getEmployeeHistory(id);
        List<BillInfoResponse> responseList = new ArrayList<>();
        for (BillEntity billEntity : list) {
            responseList.add(billMapper.mapBill(billEntity));
        }
        return responseList;
    }

    public void confirmReceiveMoneyFromEmployee(long id) {
        BillEntity bill = billRepository.findById(id).orElse(null);
        bill.setBillStatus(BillStatus.ADMIN_RECEIVED);
        billRepository.save(bill);
    }

    public List<BillInfoResponse> getAllBills() {
        List<BillEntity> list = billRepository.getAllBills();
        List<BillInfoResponse> responseList = new ArrayList<>();
        for (BillEntity billEntity : list) {
            responseList.add(billMapper.mapBill(billEntity));
        }
        return responseList;
    }

    public List<BillInfoResponse> getSchedule(long id) {
        List<BillEntity> list = billRepository.getEmployeeSchedule(id);
        List<BillInfoResponse> responseList = new ArrayList<>();
        for (BillEntity billEntity : list) {
            responseList.add(billMapper.mapBill(billEntity));
        }
        return responseList;
    }

    public List<BillInfoResponse> getCustomerBill(long id) {
        List<BillEntity> list = billRepository.getCustomerBills(id);
        List<BillInfoResponse> responseList = new ArrayList<>();
        for (BillEntity billEntity : list) {
            responseList.add(billMapper.mapBill(billEntity));
        }
        return responseList;
    }

    public List<BillInfoResponse> getCustomerHistory(long id) {
        List<BillEntity> list = billRepository.getHistoryBills(id);
        List<BillInfoResponse> responseList = new ArrayList<>();
        for (BillEntity billEntity : list) {
            responseList.add(billMapper.mapBill(billEntity));
        }
        return responseList;
    }

    public LocalTime parseToLocalTime(String timeString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss", Locale.ENGLISH);
        return LocalTime.parse(timeString, formatter);
    }

    public LocalDate convertToDate(String dateStr) {
        return LocalDate.parse(dateStr);
    }

    public List<BillInfoResponse> getAcceptedOrder(long id) {
        List<BillEntity> list = billRepository.getAcceptedBills(id);
        List<BillInfoResponse> responseList = new ArrayList<>();
        for (BillEntity billEntity : list) {
            responseList.add(billMapper.mapBill(billEntity));
        }
        return responseList;
    }

    public List<AmountResponse> getAmountByWeek(DateRequest dateRequest) {
        LocalDate monday = convertToDate(dateRequest.getDateStart());
        LocalDate sunday = convertToDate(dateRequest.getDateEnd());
        List<AmountResponse> list = new ArrayList<>();
        list.add(new AmountResponse("Đơn bị hủy", billRepository.getCancelBillsNumber(monday, sunday)));
        list.add(new AmountResponse("Đơn hoàn thành", billRepository.getCompleteBillsNumber(monday, sunday)));
        list.add(new AmountResponse("Thu nhập", billRepository.getIncome(monday, sunday)));
        list.add(new AmountResponse("Nhân viên", userRepository.getEmployeeNumber()));
        list.add(new AmountResponse("Khách hàng", userRepository.getEmployeeNumber()));
        List<ServiceEntity> serviceEntities = serviceRepository.findAll();
        for (ServiceEntity service : serviceEntities) {
            AmountResponse amountResponse = new AmountResponse(service.getName(),
                    billRepository.getServiceAmount(service.getId(), monday, sunday));
            list.add(amountResponse);
        }
        return list;
    }
}

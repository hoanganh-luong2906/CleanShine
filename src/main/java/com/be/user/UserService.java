package com.be.user;

import com.be.address.AddressEntity;
import com.be.address.AddressRepository;
import com.be.bill.BillEntity;
import com.be.bill.BillRepository;
import com.be.bill.BillService;
import com.be.building.BuildingEntity;
import com.be.building.BuildingRepository;
import com.be.dto.request.AssignEmployeeRequest;
import com.be.dto.request.EditCustomerRequest;
import com.be.dto.request.EditEmployeeRequest;
import com.be.dto.response.CustomerInfoResponse;
import com.be.email.EmailDetail;
import com.be.email.EmailService;
import com.be.room.RoomEntity;
import com.be.room.RoomRepository;
import com.be.service.ServiceEntity;
import com.be.service.ServiceRepository;
import com.be.work.WorkEntity;
import com.be.work.WorkRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private WorkRepository workRepository;
    private AddressRepository addressRepository;
    private EmailService emailService;
    private BillRepository billRepository;
    private BuildingRepository buildingRepository;
    private RoomRepository roomRepository;
    private BillService billService;
    private ServiceRepository serviceRepository;

    public void editEmployee(EditEmployeeRequest employeeRequest) {
        UserEntity user = userRepository.findById(employeeRequest.getId());
        WorkEntity workEntity = workRepository.findAllByEmployeeId(user.getId());
        ServiceEntity serviceEntity = serviceRepository.findById(employeeRequest.getServiceId()).orElse(null);
        user.setName(employeeRequest.getName());
        user.setPhone(employeeRequest.getPhone());
        String newPassword = employeeRequest.getPassword();
        if (!newPassword.isEmpty()) {
            user.setPassword(passwordEncoder.encode(newPassword));
        }
        workEntity.setService(serviceEntity);
        userRepository.save(user);
        workRepository.save(workEntity);

    }

    public void editCustomer(EditCustomerRequest customerRequest) {
        UserEntity user = userRepository.findById(customerRequest.getId());
        if (user != null) {
            AddressEntity address = addressRepository.findAddressEntityByCustomerInfo_Id(customerRequest.getId());
            user.setName(customerRequest.getName());
            user.setPhone(customerRequest.getPhone());
            BuildingEntity building = buildingRepository.findById(customerRequest.getBuildingId()).orElse(null);
            RoomEntity room = roomRepository.findById(customerRequest.getRoomId()).orElse(null);
            address.setBuilding(building);
            address.setRoom(room);
            userRepository.save(user);
            addressRepository.save(address);
        }
    }

    public void deleteEmployee(long id) {
        var user = userRepository.findById(id);
        user.setStatus(false);
        userRepository.save(user);
    }

    public void deleteCustomer(long id) {
        var user = userRepository.findById(id);
        user.setStatus(false);
        userRepository.save(user);
    }

    public CustomerInfoResponse getCustomerInfo(long id) {
        AddressEntity addressEntity = addressRepository.findAddressEntityByCustomerInfo_Id(id);
        CustomerInfoResponse customerInfoResponse = new CustomerInfoResponse(addressEntity.getCustomerInfo().getId(),
                addressEntity.getCustomerInfo().getName(),
                addressEntity.getCustomerInfo().getPhone(),
                addressEntity.getCustomerInfo().getEmail(),
                addressEntity.getBuilding().getName(),
                addressEntity.getRoom().getName(),
                addressEntity.getBuilding().getId(),
                addressEntity.getRoom().getId());
        return customerInfoResponse;
    }

    public List<CustomerInfoResponse> getAllCustomer() {
        List<AddressEntity> list = addressRepository.findAll();
        List<CustomerInfoResponse> responseList = new ArrayList<>();
        for (AddressEntity address : list) {
            CustomerInfoResponse customerInfoResponse = new CustomerInfoResponse(address.getCustomerInfo().getId(),
                    address.getCustomerInfo().getName(),
                    address.getCustomerInfo().getPhone(),
                    address.getCustomerInfo().getEmail(),
                    address.getBuilding().getName(),
                    address.getRoom().getName(),
                    address.getBuilding().getId(),
                    address.getRoom().getId());
            responseList.add(customerInfoResponse);
        }
        return responseList;
    }

    public String confirmEmail(String email) {
        UserEntity user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            return "Email exist";
        }
        String randomString = generateRandomString(6);
        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setRecipient(email);
        emailDetail.setSubject("Xác nhận đăng ký!");
        emailDetail.setMsgBody("aaa");
        emailService.sendMailConfirm(emailDetail, randomString);
        return randomString;
    }

    public static String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder(length);
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }

        return sb.toString();
    }

    public boolean checkFreeEmployee(List<BillEntity> list, LocalDate dateImplement) {
        for (BillEntity billEntity : list) {
            if (billEntity.getDateImplement().isEqual(dateImplement)) {
                return false;
            }
        }
        return true;
    }


    public List<WorkEntity> getFreeEmployees(AssignEmployeeRequest assignEmployeeRequest) {
        List<WorkEntity> listEmployee = workRepository.getEmployeesByServiceId(assignEmployeeRequest.getServiceId());
        LocalDate dateImp = billService.convertToDate(assignEmployeeRequest.getDateImplement());
        List<WorkEntity> listFree = new ArrayList<>();
        for (WorkEntity emp : listEmployee) {
            long id = emp.getEmployeeInfo().getId();
            List<BillEntity> listBill = billRepository.getEmployeeScheduleAndHistory(id);
            if (listBill.size() == 0 || checkFreeEmployee(listBill, dateImp)) {
                listFree.add(emp);
            }
        }
        return listFree;
    }
}

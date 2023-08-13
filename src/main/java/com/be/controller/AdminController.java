package com.be.controller;

import com.be.address.AddressEntity;
import com.be.address.AddressRepository;
import com.be.auth.AuthenticationService;
import com.be.bill.BillEntity;
import com.be.bill.BillService;
import com.be.dto.response.AmountResponse;
import com.be.dto.response.BillInfoResponse;
import com.be.dto.response.CustomerInfoResponse;
import com.be.service.ServiceEntity;
import com.be.service.ServiceRepository;
import com.be.service.ServiceService;
import com.be.dto.request.*;
import com.be.service_detail.ServiceDetailEntity;
import com.be.service_detail.ServiceDetailService;
import com.be.user.UserEntity;
import com.be.user.UserService;
import com.be.work.WorkEntity;
import com.be.work.WorkRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@AllArgsConstructor
public class AdminController {
    private AddressRepository addressRepository;
    private UserService userService;
    private WorkRepository workRepository;
    private AuthenticationService authenticationService;
    private BillService billService;
    private ServiceService serviceService;

    private ServiceDetailService serviceDetailService;
    private ServiceRepository serviceRepository;

    @GetMapping("/bills")
    public ResponseEntity<?> getAllBills() {
        List<BillInfoResponse> list = billService.getAllBills();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/services")
    public ResponseEntity<?> getAllBusiness() {
        List<ServiceEntity> businessEntities = serviceRepository.findAll();
        return ResponseEntity.ok(businessEntities);
    }

    @GetMapping("/service-details")
    public ResponseEntity<?> getAllServiceDetails() {
        List<ServiceDetailEntity> list = serviceDetailService.getAllServiceDetails();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/customers")
    public ResponseEntity<?> getAllCustomers() {
        List<CustomerInfoResponse> list = userService.getAllCustomer();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/employees")
    public ResponseEntity<?> getAllEmployees() {
        List<WorkEntity> list = workRepository.findAllEmployee();
        return ResponseEntity.ok(list);
    }

    @PutMapping("/employees")
    public ResponseEntity<?> editEmployee(@RequestBody EditEmployeeRequest employeeRequest) {
        userService.editEmployee(employeeRequest);
        return ResponseEntity.ok("Edit success");
    }

    @PutMapping("/customers")
    public ResponseEntity<?> editCustomer(@RequestBody EditCustomerRequest customerRequest) {
        userService.editCustomer(customerRequest);
        return ResponseEntity.ok("Edit success");
    }

    @DeleteMapping("/employees")
    public ResponseEntity<?> deleteEmployee(@RequestBody IdRequest idRequest) {
        userService.deleteEmployee(idRequest.getId());
        return ResponseEntity.ok("Delete success");
    }

    @DeleteMapping("/customers")
    public ResponseEntity<?> deleteCustomer(@RequestBody IdRequest idRequest) {
        userService.deleteCustomer(idRequest.getId());
        return ResponseEntity.ok("Delete success");
    }

    @PostMapping("/cancel-bill")
    public ResponseEntity<?> cancelBill(@RequestBody IdRequest idRequest) {
        boolean check = billService.adminCancelBill(idRequest.getId());
        if (!check) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("Cancel success");
    }

    @PostMapping("/create-employee")
    public ResponseEntity<?> createEmployee(@RequestBody EmployeeRegisterRequest request) {
        boolean checkAdd = authenticationService.createEmployee(request);
        if (!checkAdd) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("Create success");
    }

    @PostMapping("/assign-employee")
    public ResponseEntity<?> assignEmployee(@RequestBody BillUpdateRequest billUpdateRequest) {
        billService.assignEmployee(billUpdateRequest);
        return ResponseEntity.ok("Assign success");
    }

    @PostMapping("/confirm-receive-money")
    public ResponseEntity<?> confirmReceiveMoneyFromEmployee(@RequestBody IdRequest idRequest) {
        billService.confirmReceiveMoneyFromEmployee(idRequest.getId());
        return ResponseEntity.ok("Receive success");
    }

    @PostMapping("/create-service")
    public ResponseEntity<?> createService(@RequestBody CreateServiceRequest createServiceRequest) {
        serviceService.createService(createServiceRequest);
        return ResponseEntity.ok("Create success");
    }

    @PostMapping("/disable-service")
    public ResponseEntity<?> disableService(@RequestBody IdRequest idRequest) {
        serviceService.disableService(idRequest.getId());
        return ResponseEntity.ok("Disable success");
    }

    @PostMapping("/enable-service")
    public ResponseEntity<?> enableService(@RequestBody IdRequest idRequest) {
        serviceService.enableService(idRequest.getId());
        return ResponseEntity.ok("Enable success");
    }

    @PostMapping("/create-service-detail")
    public ResponseEntity<?> createServiceDetail(@RequestBody CreateServiceDetailRequest createServiceDetailRequest) {
        serviceDetailService.createServiceDetail(createServiceDetailRequest);
        return ResponseEntity.ok("Create success");
    }

    @PostMapping("/disable-service-detail")
    public ResponseEntity<?> disableServiceDetail(@RequestBody IdRequest idRequest) {
        serviceDetailService.disableServiceDetail(idRequest.getId());
        return ResponseEntity.ok("Disable success");
    }

    @PostMapping("/enable-service-detail")
    public ResponseEntity<?> enableServiceDetail(@RequestBody IdRequest idRequest) {
        serviceDetailService.enableServiceDetail(idRequest.getId());
        return ResponseEntity.ok("Enable success");
    }

    @PostMapping("/edit-service")
    public ResponseEntity<?> editService(@RequestBody EditServiceRequest editServiceRequest) {
        serviceService.editService(editServiceRequest);
        return ResponseEntity.ok("Edit success");
    }

    @PostMapping("/edit-service-detail")
    public ResponseEntity<?> editService(@RequestBody EditServiceDetailRequest editServiceDetailRequest) {
        serviceDetailService.editServiceDetailRequest(editServiceDetailRequest);
        return ResponseEntity.ok("Edit success");
    }

    @PostMapping("/employees-by-service")
    public ResponseEntity<?> getFreeEmployeesByService(@RequestBody AssignEmployeeRequest assignEmployeeRequest) {
        List<WorkEntity> freeEmployeeList = userService.getFreeEmployees(assignEmployeeRequest);
        return ResponseEntity.ok(freeEmployeeList);
    }
    @PostMapping("/amount")
    public ResponseEntity<?> getAmountByWeek(@RequestBody DateRequest dateRequest){
        List<AmountResponse> list = billService.getAmountByWeek(dateRequest);
        return ResponseEntity.ok(list);
    }
}

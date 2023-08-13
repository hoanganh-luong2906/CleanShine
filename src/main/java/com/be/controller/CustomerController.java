package com.be.controller;
import com.be.bill.*;
import com.be.dto.request.*;
import com.be.dto.response.AmountResponse;
import com.be.dto.response.BillInfoResponse;
import com.be.dto.response.CustomerInfoResponse;
import com.be.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer")
@PreAuthorize("hasRole('CUSTOMER')")
@AllArgsConstructor
public class CustomerController {
    private UserService userService;
    private BillService billService;

    @PutMapping("/edit")
    public ResponseEntity<?> editCustomerProfile(@RequestBody EditCustomerRequest editCustomerRequest) {
        userService.editCustomer(editCustomerRequest);
        return ResponseEntity.ok(null);
    }


    @PostMapping("/info")
    public ResponseEntity<?> getCustomerInfo(@RequestBody IdRequest idRequest) {
        CustomerInfoResponse customerInfoResponse = userService.getCustomerInfo(idRequest.getId());
        return ResponseEntity.ok(customerInfoResponse);
    }

    @PostMapping("/create-bill")
    public ResponseEntity<?> createBill(@RequestBody BillCreateRequest billCreateRequest) {
        boolean check = billService.createBill(billCreateRequest);
        if (check == false) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("Đặt hàng thành công");
    }

    @PostMapping("/cancel-bill")
    public ResponseEntity<?> cancelBill(@RequestBody IdRequest idRequest){
        boolean check = billService.customerCancelBill(idRequest.getId());
        if(!check){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("Cancel success");
    }

    @PostMapping("/orders")
    public ResponseEntity<?> getCurrentBills(@RequestBody IdRequest requestInfo) {
        List<BillInfoResponse> list = billService.getCustomerBill(requestInfo.getId());
        return ResponseEntity.ok(list);
    }


    @PostMapping("/history")
    public ResponseEntity<?> getHistoryBills(@RequestBody IdRequest requestInfo) {
        List<BillInfoResponse> list = billService.getCustomerHistory(requestInfo.getId());
        return ResponseEntity.ok(list);
    }



}

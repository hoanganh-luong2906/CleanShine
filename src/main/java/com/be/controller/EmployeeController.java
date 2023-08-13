package com.be.controller;

import com.be.bill.BillService;
import com.be.dto.request.IdRequest;
import com.be.dto.response.BillInfoResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/employee")
@PreAuthorize("hasRole('EMPLOYEE')")
@AllArgsConstructor
public class EmployeeController {
    private final BillService billService;


    @PostMapping("/schedule")
    public ResponseEntity<?> getEmployeeSchedule(@RequestBody IdRequest idRequest) {
        List<BillInfoResponse> listSchedule = billService.getSchedule(idRequest.getId());
        return ResponseEntity.ok(listSchedule);
    }

    @PostMapping("/accepted-orders")
        public ResponseEntity<?> getEmployeeConfirmOrder(@RequestBody IdRequest idRequest){
        List<BillInfoResponse> listSchedule = billService.getAcceptedOrder(idRequest.getId());
        return ResponseEntity.ok(listSchedule);
    }
    @PostMapping("/accept-assign")
    public ResponseEntity<?> acceptAssign(@RequestBody IdRequest idRequest) {
        billService.acceptAssign(idRequest.getId());
        return ResponseEntity.ok("Accept success");
    }

    @PostMapping("/deny-assign")
    public ResponseEntity<?> denyAssign(@RequestBody IdRequest idRequest) {
        billService.denyAssign(idRequest.getId());
        return ResponseEntity.ok("Deny success");
    }

    @PostMapping("/confirm-complete")
    public ResponseEntity<?> confirmComplete(@RequestBody IdRequest idRequest) {
        billService.confirmComplete(idRequest.getId());
        return ResponseEntity.ok("Deny success");
    }

    @PostMapping("/history")
    public ResponseEntity<?> getHistory(@RequestBody IdRequest requestInfo) {
        List<BillInfoResponse> list = billService.getEmployeeHistory(requestInfo.getId());
        return ResponseEntity.ok(list);
    }

}

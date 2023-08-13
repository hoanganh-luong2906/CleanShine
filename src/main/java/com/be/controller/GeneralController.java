package com.be.controller;

import com.be.dto.request.EmailConfirmRequest;
import com.be.dto.request.IdRequest;
import com.be.dto.response.CodeResponse;
import com.be.service.ServiceEntity;
import com.be.service.ServiceRepository;
import com.be.building.BuildingService;
import com.be.dto.response.DepartmentResponse;
import com.be.service_detail.ServiceDetailEntity;
import com.be.service_detail.ServiceDetailRepository;
import com.be.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class GeneralController {
    private final ServiceRepository serviceRepository;
    private final BuildingService buildingService;
    private final UserService userService;
    private final ServiceDetailRepository serviceDetailRepository;
    @PostMapping("/confirm-email")
    public ResponseEntity<?> confirmEmail(@RequestBody EmailConfirmRequest emailConfirmRequest) {
        String code = userService.confirmEmail(emailConfirmRequest.getEmail());
        CodeResponse codeResponse = new CodeResponse(code);
        return ResponseEntity.ok(codeResponse);
    }

    @GetMapping("/services")
    public ResponseEntity<?> getAllBusiness() {
        List<ServiceEntity> businessEntities = serviceRepository.findServiceEntitiesByStatus(true);
        return ResponseEntity.ok(businessEntities);
    }

    @GetMapping("/departments")
    public ResponseEntity<?> getAllDepartment() {
        List<DepartmentResponse> departmentEntities = buildingService.getDepartmentEntities();
        return ResponseEntity.ok(departmentEntities);
    }

    @PostMapping("/service-detail")
    public ResponseEntity<?> getServiceDetail(@RequestBody IdRequest idRequest){
       List<ServiceDetailEntity> list = serviceDetailRepository.findServiceDetailEntitiesByService_IdAndStatus(idRequest.getId(), true);
       return ResponseEntity.ok(list);
    }

}

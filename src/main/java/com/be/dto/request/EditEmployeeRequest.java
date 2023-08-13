package com.be.dto.request;

import lombok.Data;

@Data
public class EditEmployeeRequest {
    long id;
    String name;
    String phone;
    String password;
    long serviceId;
}

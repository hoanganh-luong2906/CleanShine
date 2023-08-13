package com.be.dto.request;

import lombok.Data;

@Data
public class EmployeeRegisterRequest{
    private String name;
    private String email;
    private String password;
    private String phone;
    private long serviceId;
}
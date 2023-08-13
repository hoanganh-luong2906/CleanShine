package com.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerLoginResponse {
    long id;
    String name;
    String role;
    String phone;
}

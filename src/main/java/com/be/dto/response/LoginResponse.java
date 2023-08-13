package com.be.dto.response;

import lombok.Data;

@Data
public class LoginResponse {
    public CustomerLoginResponse user;
    public String jwtToken;
}


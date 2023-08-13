package com.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CreateServiceDetailRequest {
    long serviceId;
    String name;
    double price;
}

package com.be.dto.request;

import lombok.Data;

@Data
public class CreateAddressRequest {
    long customerId;
    long buildingId;
    long roomId;
}

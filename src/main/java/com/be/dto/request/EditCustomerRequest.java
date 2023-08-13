package com.be.dto.request;

import lombok.Data;

@Data
public class EditCustomerRequest {
    long id;
    String name;
    String phone;
    long buildingId;
    long roomId;
}

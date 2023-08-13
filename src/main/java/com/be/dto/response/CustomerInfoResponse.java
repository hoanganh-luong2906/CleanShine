package com.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerInfoResponse {
    long id;
    String name;
    String phone;
    String email;
    String buildingNumber;
    String roomNumber;
    long buildingId;
    long roomId;
}

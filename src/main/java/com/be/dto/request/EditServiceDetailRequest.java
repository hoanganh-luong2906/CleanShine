package com.be.dto.request;

import lombok.Data;

@Data

public class EditServiceDetailRequest {
    long serviceDetailId;
    String name;
    double price;
}

package com.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CreateServiceRequest {
    String name;
    String linkIcon;
}

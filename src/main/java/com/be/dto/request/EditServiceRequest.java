package com.be.dto.request;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class EditServiceRequest {
   long serviceId;
   @Column(length = 10000)
   String linkIcon;
   String name;
}

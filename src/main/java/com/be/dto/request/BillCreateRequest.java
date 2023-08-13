package com.be.dto.request;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BillCreateRequest {
    long customerId;
    long employeeId;
    long serviceDetailId;
    long roomId;
    String payment;
    @Column(length = 10000)
    String note;
    String dateOrder;
    String dateImplement;
    String timeStart;
    String timeEnd;
}

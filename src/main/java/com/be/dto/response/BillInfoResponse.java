package com.be.dto.response;

import com.be.service_detail.ServiceDetailEntity;
import com.be.status.BillStatus;
import com.be.status.Payment;
import com.be.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
@AllArgsConstructor
@Data
public class BillInfoResponse {
    long id;
    UserEntity employee;
    UserEntity customer;
    ServiceDetailEntity serviceDetail;
    String buildingName;
    String roomName;
    LocalDate dateOrder;
    LocalDate dateImplement;
    LocalTime timeStart;
    LocalTime timeEnd;
    Payment payment;
    boolean completeStatus;
    BillStatus billStatus;
    String note;
}

package com.be.dto.response;


import com.be.status.BillStatus;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScheduleResponse {
    long id;
    String type;
    String buildingNumber;
    String roomNumber;
    String customerPhone;
    BillStatus billStatus;
    double total;
    @Column(length = 10000)
    String note;
    String hour;
}

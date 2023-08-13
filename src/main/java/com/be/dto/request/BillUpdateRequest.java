package com.be.dto.request;

import lombok.Data;

@Data
public class BillUpdateRequest {
    public long billId;
    public long employeeId;
}

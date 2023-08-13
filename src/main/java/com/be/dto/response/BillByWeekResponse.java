package com.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BillByWeekResponse {
    long amount;
    String day;
    String name;
}

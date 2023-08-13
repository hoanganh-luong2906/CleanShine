package com.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AmountResponse {
    String category;
    long amount;
}

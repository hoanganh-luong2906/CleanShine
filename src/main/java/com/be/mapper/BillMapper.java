package com.be.mapper;

import com.be.bill.BillEntity;
import com.be.dto.response.BillInfoResponse;
import org.springframework.stereotype.Component;

@Component
public class BillMapper {
    public BillInfoResponse mapBill(BillEntity billEntity) {
        return new BillInfoResponse(
                billEntity.getId(),
                billEntity.getEmployee(),
                billEntity.getCustomer(),
                billEntity.getServiceDetail(),
                billEntity.getRoom().getBuilding().getName(),
                billEntity.getRoom().getName(),
                billEntity.getDateOrder(),
                billEntity.getDateImplement(),
                billEntity.getTimeStart(),
                billEntity.getTimeEnd(),
                billEntity.getPayment(),
                billEntity.isCompleteStatus(),
                billEntity.getBillStatus(),
                billEntity.getNote());
    }
}

package com.be.work;

import com.be.bill.BillRepository;
import com.be.building.BuildingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WorkService {

    private WorkRepository workRepository;
    private BuildingRepository buildingRepository;
    private BillRepository billRepository;


}

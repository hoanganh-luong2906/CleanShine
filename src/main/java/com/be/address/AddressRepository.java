package com.be.address;

import com.be.dto.response.CustomerInfoResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressRepository extends JpaRepository<AddressEntity, Long>{
    AddressEntity findAddressEntityByCustomerInfo_Id(long customerId);
}

package com.be.service_detail;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceDetailRepository extends JpaRepository<ServiceDetailEntity, Long> {
    List<ServiceDetailEntity> findServiceDetailEntitiesByService_IdAndStatus(long id, boolean status);
}

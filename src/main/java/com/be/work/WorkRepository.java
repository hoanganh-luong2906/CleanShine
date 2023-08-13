package com.be.work;

import com.be.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WorkRepository extends JpaRepository<WorkEntity, Long> {
    @Query("SELECT w from WorkEntity w where w.employeeInfo.id = :employeeId and w.employeeInfo.status = true")
    WorkEntity findAllByEmployeeId(@Param("employeeId") Long id);

    @Query("SELECT w from WorkEntity w where w.employeeInfo.status = true")
    List<WorkEntity> findAllEmployee();

    @Query("SELECT w from WorkEntity w WHERE w.service.id = :serviceId")
    List<WorkEntity> getEmployeesByServiceId(@Param("serviceId") long serviceId);
}

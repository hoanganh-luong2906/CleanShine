package com.be.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    @Query("SELECT u FROM UserEntity u where u.status = true and u.id = :id")
    UserEntity findById(@Param("id") long id);
    @Query("SELECT count(u) from UserEntity u where u.role = com.be.user.Role.EMPLOYEE and u.status = true")
    long getEmployeeNumber();
    @Query("SELECT count(u) from UserEntity u where u.role = com.be.user.Role.CUSTOMER and u.status = true")
    long getCustomerNumber();
}

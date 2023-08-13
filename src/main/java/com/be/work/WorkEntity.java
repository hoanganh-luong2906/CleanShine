package com.be.work;

import com.be.service.ServiceEntity;
import com.be.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "work_type")
public class WorkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employee", referencedColumnName = "id")
    private UserEntity employeeInfo;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "service", referencedColumnName = "id")
    private ServiceEntity service;
}
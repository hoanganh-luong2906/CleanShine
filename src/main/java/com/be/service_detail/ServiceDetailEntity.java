package com.be.service_detail;

import com.be.service.ServiceEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "service_detail")
public class ServiceDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "service", referencedColumnName = "id")
    private ServiceEntity service;
    private String name;
    private double price;
    private boolean status;

    public ServiceDetailEntity(ServiceEntity service, String name, double price, boolean status) {
        this.service = service;
        this.name = name;
        this.price = price;
        this.status = status;
    }
}

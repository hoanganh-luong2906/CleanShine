package com.be.service;

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
@Table(name = "service")
public class ServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private boolean status;
    @Column(length = 10000)
    private String linkIcon;

    public ServiceEntity(String name, boolean status, String linkIcon) {
        this.name = name;
        this.status = status;
        this.linkIcon = linkIcon;
    }
}
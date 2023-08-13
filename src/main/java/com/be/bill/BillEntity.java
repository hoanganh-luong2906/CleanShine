package com.be.bill;

import com.be.building.BuildingEntity;
import com.be.room.RoomEntity;
import com.be.service_detail.ServiceDetailEntity;
import com.be.status.BillStatus;
import com.be.status.Payment;
import com.be.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "bill")
public class BillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "employee")
    private UserEntity employee;
    @ManyToOne
    @JoinColumn(name = "customer")
    private UserEntity customer;
    @ManyToOne
    @JoinColumn(name = "service_detail")
    private ServiceDetailEntity serviceDetail;
    @ManyToOne
    @JoinColumn(name = "room")
    private RoomEntity room;

    @Column(name = "date_order")
    private LocalDate dateOrder;

    @Column(name = "date_implement")
    private LocalDate dateImplement;

    @Column(name = "time_start")
    private LocalTime timeStart;

    @Column(name = "time_end")
    private LocalTime timeEnd;

    private Payment payment;

    private boolean completeStatus;
    private BillStatus billStatus;
    @Column(length = 10000)
    private String note;


}
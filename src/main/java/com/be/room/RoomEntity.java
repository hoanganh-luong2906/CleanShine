package com.be.room;

import com.be.building.BuildingEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "room")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(length = 50)
    private String name;

    @ManyToOne
    @JoinColumn(name = "building_id")
    private BuildingEntity building;

}

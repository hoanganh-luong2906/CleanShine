package com.be.address;

import com.be.building.BuildingEntity;
import com.be.room.RoomEntity;
import com.be.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "address")
public class AddressEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer", referencedColumnName = "id")
    private UserEntity customerInfo;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "building", referencedColumnName = "id")
    private BuildingEntity building;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "room", referencedColumnName = "id")
    private RoomEntity room;

    public AddressEntity(UserEntity customerInfo, BuildingEntity building, RoomEntity room) {
        this.customerInfo = customerInfo;
        this.building = building;
        this.room = room;
    }
}
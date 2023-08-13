package com.be.util;

import com.be.auth.AuthenticationService;
import com.be.service.ServiceEntity;
import com.be.service.ServiceRepository;
import com.be.config.JwtService;
import com.be.building.BuildingEntity;
import com.be.building.BuildingRepository;
import com.be.room.RoomEntity;
import com.be.room.RoomRepository;
import com.be.service_detail.ServiceDetailEntity;
import com.be.service_detail.ServiceDetailRepository;
import com.be.user.Role;
import com.be.user.UserEntity;
import com.be.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final ServiceRepository serviceRepository;
    private final BuildingRepository buildingRepository;
    private final RoomRepository roomRepository;
    private final ServiceDetailRepository serviceDetailRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() < 1) {
            UserEntity user = new UserEntity();
            user.setName("Admin");
            user.setEmail("admin@gmail.com");
            user.setPhone("001");
            user.setPassword(passwordEncoder.encode("1"));
            user.setRole(Role.ADMIN);
            user.setStatus(true);
            var savedUser = userRepository.save(user);
            var jwtToken = jwtService.generateToken(user);
            authenticationService.saveUserToken(savedUser, jwtToken);


            BuildingEntity department = new BuildingEntity();
            department.setName("S101");
            BuildingEntity newDepart = buildingRepository.save(department);
            RoomEntity roomEntity = new RoomEntity();
            roomEntity.setName("100");
            roomEntity.setBuilding(newDepart);
            RoomEntity roomEntity2 = new RoomEntity();
            roomEntity2.setName("101");
            roomEntity2.setBuilding(newDepart);
            List<RoomEntity> rooms = new ArrayList<>();
            rooms.add(roomRepository.save(roomEntity));
            rooms.add(roomRepository.save(roomEntity2));
            newDepart.setRooms(rooms);
            buildingRepository.save(newDepart);

            BuildingEntity department2 = new BuildingEntity();
            department2.setName("S201");
            BuildingEntity newDepart2 = buildingRepository.save(department2);
            RoomEntity roomEntity1 = new RoomEntity();
            roomEntity1.setName("202");
            roomEntity1.setBuilding(newDepart2);
            RoomEntity roomEntity3 = new RoomEntity();
            roomEntity3.setName("203");
            roomEntity3.setBuilding(newDepart2);
            List<RoomEntity> rooms1 = new ArrayList<>();
            rooms.add(roomRepository.save(roomEntity1));
            rooms.add(roomRepository.save(roomEntity3));
            newDepart.setRooms(rooms1);
            buildingRepository.save(newDepart2);

            BuildingEntity department3 = new BuildingEntity();
            department3.setName("S301");
            BuildingEntity newDepart3 = buildingRepository.save(department3);
            RoomEntity roomEntity4 = new RoomEntity();
            roomEntity4.setName("302");
            roomEntity4.setBuilding(newDepart3);
            RoomEntity roomEntity5 = new RoomEntity();
            roomEntity5.setName("303");
            roomEntity5.setBuilding(newDepart3);
            List<RoomEntity> rooms2 = new ArrayList<>();
            rooms.add(roomRepository.save(roomEntity4));
            rooms.add(roomRepository.save(roomEntity5));
            newDepart.setRooms(rooms2);
            buildingRepository.save(newDepart3);

            ServiceEntity serviceEntity = new ServiceEntity("Giúp việc theo giờ", true, "https://static.vecteezy.com/system/resources/previews/005/089/556/original/working-hours-icon-style-vector.jpg");
            ServiceEntity serviceEntity1 = new ServiceEntity("Tổng vệ sinh", true, "https://cdn-icons-png.flaticon.com/512/6676/6676508.png");
            ServiceEntity serviceEntity2 = new ServiceEntity("Vệ sinh nệm, sofa, thảm", true, "https://cdn-icons-png.flaticon.com/512/2361/2361624.png");
            ServiceEntity serviceEntity3 = new ServiceEntity("Vệ sinh máy lạnh", true, "https://cdn-icons-png.flaticon.com/512/114/114735.png");
            serviceRepository.save(serviceEntity);
            serviceRepository.save(serviceEntity1);
            serviceRepository.save(serviceEntity2);
            serviceRepository.save(serviceEntity3);

            ServiceDetailEntity serviceDetailEntity = new ServiceDetailEntity(1, serviceEntity, "1 phòng", 150000, true);
            ServiceDetailEntity serviceDetailEntity1 = new ServiceDetailEntity(2,serviceEntity, "2 phòng", 180000, true);
            ServiceDetailEntity serviceDetailEntity2 = new ServiceDetailEntity(3, serviceEntity, "3 phòng", 200000, true);
            ServiceDetailEntity serviceDetailEntity3 = new ServiceDetailEntity(4,serviceEntity1, "Studio", 250000, true);
            ServiceDetailEntity serviceDetailEntity4 = new ServiceDetailEntity(5,serviceEntity1, "2PN+2WC", 350000, true);
            ServiceDetailEntity serviceDetailEntity5 = new ServiceDetailEntity(6,serviceEntity1, "3PN+3WC", 450000, true);
            ServiceDetailEntity serviceDetailEntity6 = new ServiceDetailEntity(7,serviceEntity2, "Sofa", 170000, true);
            ServiceDetailEntity serviceDetailEntity7 = new ServiceDetailEntity(8,serviceEntity2, "Thảm", 190000, true);
            ServiceDetailEntity serviceDetailEntity8 = new ServiceDetailEntity(9, serviceEntity2, "Nệm", 210000, true);
            ServiceDetailEntity serviceDetailEntity9 = new ServiceDetailEntity(10,serviceEntity3, "Treo tường", 250000, true);
            ServiceDetailEntity serviceDetailEntity10 = new ServiceDetailEntity(11,serviceEntity3, "Tủ đứng", 350000, true);
            ServiceDetailEntity serviceDetailEntity11 = new ServiceDetailEntity(12,serviceEntity3, "Âm trần", 450000, true);
            ServiceDetailEntity serviceDetailEntity12 = new ServiceDetailEntity(13,serviceEntity3, "Áp trần", 550000, true);
            serviceDetailRepository.save(serviceDetailEntity);
            serviceDetailRepository.save(serviceDetailEntity1);
            serviceDetailRepository.save(serviceDetailEntity2);
            serviceDetailRepository.save(serviceDetailEntity3);
            serviceDetailRepository.save(serviceDetailEntity4);
            serviceDetailRepository.save(serviceDetailEntity5);
            serviceDetailRepository.save(serviceDetailEntity6);
            serviceDetailRepository.save(serviceDetailEntity7);
            serviceDetailRepository.save(serviceDetailEntity8);
            serviceDetailRepository.save(serviceDetailEntity9);
            serviceDetailRepository.save(serviceDetailEntity10);
            serviceDetailRepository.save(serviceDetailEntity11);
            serviceDetailRepository.save(serviceDetailEntity12);
        }
    }
}

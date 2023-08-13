package com.be.building;

import com.be.dto.response.DepartmentResponse;
import com.be.dto.response.RoomResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BuildingService {
    private final BuildingRepository buildingRepository;
    public List<DepartmentResponse> getDepartmentEntities() {
        List<BuildingEntity> list = buildingRepository.findAll();

        return list.stream()
                .map(department -> {
                    DepartmentResponse response = new DepartmentResponse();
                    response.setDepartmentId(department.getId());
                    response.setDepartmentName(department.getName());
                    List<RoomResponse> roomList = department.getRooms().stream()
                            .map(room -> new RoomResponse(room.getId(), room.getName()))
                            .collect(Collectors.toList());
                    response.setRooms(roomList);
                    return response;
                })
                .collect(Collectors.toList());
    }
}

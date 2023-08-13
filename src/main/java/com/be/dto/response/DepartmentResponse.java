package com.be.dto.response;

import lombok.Data;

import java.util.List;
@Data
public class DepartmentResponse {
    long departmentId;
    String departmentName;
    List<RoomResponse> rooms;
}

import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const EditAddressForm = (props) => {
  const [departs, setDeparts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedToa, setSelectedToa] = useState("");
  const [selectedCanHo, setSelectedCanHo] = useState("");
  useEffect(() => {
    const departmentLoader = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(apiUrl + "departments");
      const data = await res.json();
      return data;
    };
    const loadDepartments = async () => {
      const result = await departmentLoader();
      const DEPARTMENT = result.map((e) => ({
        value: e.departmentId,
        label: e.departmentName,
        rooms: e.rooms,
      }));
      setDeparts(DEPARTMENT);
    };

    loadDepartments();
  }, []);
  const roomHandler = (event) => {
    const selectedRoom = event.target.value;
    setSelectedCanHo(selectedRoom);
    props.onEditRoom(selectedRoom);
  };
  const departmentHandler = (event) => {
    const selectedDepartment = event.target.value;
    setSelectedToa(selectedDepartment);
    const roomsOption = departs.filter(
      (department) => department.value === event.target.value
    );
    const opts = roomsOption[0].rooms.map((e) => ({
      value: e.id,
      label: e.roomName,
    }));
    setRooms(opts);
    props.onEditBuilding(selectedDepartment);
  };
  return (
    <>
      <FormControl
        variant="standard"
        sx={{ width: "70%", marginLeft: 4, marginTop: 3 }}
      >
        <InputLabel
          id="demo-simple-select-standard-label"
          sx={{ justifyContent: "left" }}
        >
          Tòa
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={departmentHandler}
          displayEmpty
        >
          {departs.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{ width: "70%", marginLeft: 4, marginTop: 3 }}
      >
        <InputLabel
          id="demo-simple-select-standard-label"
          sx={{ justifyContent: "left" }}
        >
          Căn hộ
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={roomHandler}
          displayEmpty
          required
          disabled={!selectedToa}
        >
          {rooms.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default EditAddressForm;

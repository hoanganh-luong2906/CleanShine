import React, { useState } from "react";
import Title from "./Title";
import "./SignComponent.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import Swal from "sweetalert2";
const SignUpForm = (props) => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [selectedToa, setSelectedToa] = useState("");
  const [selectedCanHo, setSelectedCanHo] = useState("");
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const registerHandler = async () => {
    if (
      email.trim() === "" ||
      phone.trim() === "" ||
      password.trim() === "" ||
      selectedToa === "" ||
      selectedCanHo === ""
    ) {
      Swal.fire({
        title: "Vui lòng nhập đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    if (name.length < 0 || name.length > 25) {
      Swal.fire({
        title: "Tên có độ dài dưới 25 ký tự",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    let userEmail = {
      email: email,
    };
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "confirm-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmail),
    });
    if (!res.ok) {
      throw new Error("error");
    } else {
      const data = await res.json();
      setCode(data.code);
      setOpen(true);
    }
  };
  const register = async () => {
    if (code !== inputCode) {
      Swal.fire({
        title: "Sai mã",
        icon: "error",
        confirmButtonText: "Close",
      });
    } else {
      let newUser = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        buildingId: selectedToa,
        roomId: selectedCanHo,
      };
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(apiUrl + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) {
        throw new Error("error");
      } else {
        Swal.fire({
          title: "Đăng ký thành công",
          icon: "success",
          confirmButtonText: "Close",
        });
      }
      nav("/sign-in");
    }
  };

  const nameHandler = (event) => {
    const inputValue = event.target.value;
    setName(inputValue);
    if (name !== "") {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const emailHandler = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
    if (!/^[\w-.]+@gmail\.com$/i.test(inputValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const passwordHandler = (event) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
  };
  const DEPARTMENT = props.data.map((e) => ({
    value: e.departmentId,
    label: e.departmentName,
    rooms: e.rooms,
  }));

  const departmentHandler = (event) => {
    const selectedDepartment = event.target.value;
    setSelectedToa(selectedDepartment);
    const roomsOption = DEPARTMENT.filter(
      (department) => department.value === event.target.value
    );
    const opts = roomsOption[0].rooms.map((e) => ({
      value: e.id,
      label: e.roomName,
    }));
    setRooms(opts);
  };

  const roomHandler = (event) => {
    const selectedRoom = event.target.value;
    setSelectedCanHo(selectedRoom);
  };
  const phoneHandler = (event) => {
    const inputValue = event.target.value;
    setPhone(inputValue);
    if (!/^0\d{9}$/.test(inputValue)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleInputCode = (e) => {
    setInputCode(e.target.value);
  };

  return (
    <div className="container">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Mã xác nhận đã được gửi tới email của bạn"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nhập mã xác nhận
          </DialogContentText>
          <Input
            sx={{ width: "90%", marginLeft: 4, marginTop: 4 }}
            onChange={handleInputCode}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={register} autoFocus>
            XÁC NHẬN
          </Button>
        </DialogActions>
      </Dialog>
      <div className="row">
        <div className="col-md-6">
          <img
            src="/assets/images/registration.svg"
            alt=""
            style={{ width: "800px", height: "100%" }}
          />
        </div>
        <div className="col-3 offset-md-1 ">
          <Title
            color="#015450"
            title="ĐĂNG KÝ"
            fontSize="25px"
            fontWeight="600"
          />

          <div className="col-md-12 mt-3">
            <Input
              sx={{ width: "90%", marginLeft: 4 }}
              placeholder="Họ tên"
              value={name}
              onChange={nameHandler}
              error={nameError}
              required
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              }
            />
            {nameError && (
              <Alert severity="error" sx={{ ml: 4 }}>
                Họ tên không hợp lệ!
              </Alert>
            )}
            <Input
              sx={{ width: "90%", marginLeft: 4, marginTop: 4 }}
              placeholder="Email"
              onChange={emailHandler}
              required
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
            />
            {emailError && (
              <Alert severity="error" sx={{ marginLeft: 4 }}>
                Email không hợp lệ!
              </Alert>
            )}
            <Input
              sx={{ width: "90%", marginLeft: 4, marginTop: 4 }}
              placeholder="Số điện thoại"
              onChange={phoneHandler}
              required
              startAdornment={
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              }
            />
            {phoneError && (
              <Alert severity="error" sx={{ marginLeft: 4 }}>
                Số điện thoại không hợp lệ!
              </Alert>
            )}
            <Input
              id="standard-adornment-password"
              sx={{ width: "90%", marginLeft: 4, marginTop: 4 }}
              placeholder="Mật khẩu"
              onChange={passwordHandler}
              type={showPassword ? "text" : "password"}
              required
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormControl
              variant="standard"
              sx={{ width: "40%", marginLeft: 4, marginTop: 3 }}
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
                required
                startAdornment={
                  <InputAdornment position="start">
                    <ApartmentIcon />
                  </InputAdornment>
                }
              >
                {DEPARTMENT.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ width: "40%", marginLeft: 4, marginTop: 3 }}
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
                startAdornment={
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                }
              >
                {rooms.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={registerHandler}
              sx={{
                fontFamily: "Montserrat",
                width: "40%",
                height: "30%",
                mt: 5,
                mb: 7,
                ml: 15,
                backgroundColor: "#397F77",
                color: "#ffffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                letterSpacing: "0.07rem",
                "&:hover": {
                  backgroundColor: "#397F77",
                },
              }}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

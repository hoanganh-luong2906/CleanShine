import React, { useState } from "react";
import Title from "./Title";
import "./SignComponent.css";
import { Input, InputAdornment, Button, Alert } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      const loginData = {
        email: email,
        password: password,
      };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(apiUrl + "authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.status === 403) {
        setError("Sai tài khoản hoặc mật khẩu");
        return;
      }
      if (!response.ok) {
        setError("Bạn không có quyền đăng nhập");
        return;
      }
      const data = await response.json();
      const user = data.user;
      const jwtToken = data.jwtToken;
      sessionStorage.setItem("jwtToken", jwtToken);
      sessionStorage.setItem("user", JSON.stringify(user));
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "CUSTOMER") {
        navigate("/user");
      } else if (user.role === "EMPLOYEE") {
        navigate("/employee");
      }
    } else {
      setError("Sai email và mật khẩu rồi");
      setEmail("");
      setPassword("");
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src="/assets/images/sign_in.svg"
            alt=""
            style={{ width: "800px", height: "100%" }}
          />
        </div>
        <div className="col-3 offset-md-1 ">
          <Title
            color="#015450"
            title="ĐĂNG NHẬP"
            fontSize="25px"
            fontWeight="600"
          />
          <div className="col-md-12 mt-3">
            <Input
              sx={{ width: "90%", marginLeft: 4 }}
              placeholder="Email"
              value={email}
              onChange={emailHandler}
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              }
            ></Input>
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
            {error && (
              <Alert severity="error" sx={{ marginLeft: 4 }}>
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              onClick={loginHandler}
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
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
      {/* <Card>
        <form className="px-lg-5 px-sm-0" onSubmit={loginHandler}>
          <Title
            color="#015450"
            title="ĐĂNG NHẬP"
            fontSize="30px"
            fontWeight="600"
          />
          <div className="mt-3">
            <TextField
              className="mb-3 w-100"
              label="Email"
              variant="outlined"
              value={email}
              onChange={emailHandler}
            />
          </div>
          <div className="mt-3">
            <TextField
              type="password"
              className="mb-3 w-100"
              label="Password"
              variant="outlined"
              value={password}
              onChange={passwordHandler}
            />
          </div>
          <p style={{ color: "red" }}>{error}</p>

          <div className="d-flex justify-content-center">
            <Title
              color="#000000"
              title="Chưa có tài khoản?"
              fontSize="15px"
              fontWeight="400"
              padding="0 5px 0 0"
            />

            <Link to="/sign-up">
              <Title
                color="#000000"
                title="Đăng ký ngay"
                fontSize="15px"
                fontWeight="400"
              />
            </Link>
          </div>

          <div className="d-flex justify-content-center my-5">
            <Button
              backgroundColor=" #397F77 "
              borderRadius="15px"
              padding="5px 30px"
            >
              <Title
                color="#ffffff"
                title="Đăng nhập"
                fontSize="17px"
                fontWeight="400"
              />
            </Button>
          </div>
        </form>
      </Card> */}
    </div>
  );
};

export default SignInForm;

import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ConfirmComplete = (props) => {
  const nav = useNavigate();
  const acceptConfirm = async () => {
    const token = sessionStorage.getItem("jwtToken");
    const id = {
      id: props.id,
    };
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "employee/accept-assign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    });

    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    Swal.fire({
      title: "Xác nhận thành công",
      icon: "success",
      confirmButtonText: "Close",
    });

    nav("/employee");
  };

  const denyConfirm = async () => {
    const token = sessionStorage.getItem("jwtToken");
    const id = {
      id: props.id,
    };
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "employee/deny-assign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    });

    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    Swal.fire({
      title: "Từ chối thành công",
      icon: "success",
      confirmButtonText: "Close",
    });

    nav("/employee");
  };
  return (
    <>
      <Button
        onClick={acceptConfirm}
        style={{
          fontSize: "12px",
          border: "1px solid #1976d2",
          textAlign: "center",
        }}
      >
        Xác nhận
      </Button>
      <Button
        onClick={denyConfirm}
        style={{
          fontSize: "12px",
          border: "1px solid red",
          textAlign: "center",
          color: "red",
          marginLeft: "10px",
        }}
      >
        Từ chối
      </Button>
    </>
  );
};

export default ConfirmComplete;

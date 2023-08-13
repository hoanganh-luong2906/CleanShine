import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"



const ConfirmComplete = (props) => {
  const nav = useNavigate();
  const paymentConfirm = async () => {
    const token = sessionStorage.getItem("jwtToken");
    const id = {
      id: props.id,
    };
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/confirm", {
      method: "PUT",
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
      title: 'Chỉnh sửa thành công',
      icon: 'success',
      confirmButtonText: 'Close'
    })
    nav("/admin/order-service");
  };
  return (
    <div>
      <Button onClick={paymentConfirm} style={{ fontSize: "12px" }}>
        {" "}
        <img
          src="/assets/images/checkall.svg"
          alt=""
          style={{ width: "30%" }}
        />
        Xác nhận
      </Button>
    </div>
  );
};

export default ConfirmComplete;

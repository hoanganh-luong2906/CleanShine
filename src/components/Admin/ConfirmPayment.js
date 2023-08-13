import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ConfirmPayment = (props) => {
  const nav = useNavigate();
  const paymentConfirm = async () => {
    const token = sessionStorage.getItem("jwtToken");
    const id = {
      id: props.id,
    };
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/confirm-payment", {
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
      title: "Chỉnh sửa thành công",
      icon: "success",
      confirmButtonText: "Close",
    });

    nav("/admin/order-service");
  };
  return (
    <Button
      href="#text-buttons"
      onClick={paymentConfirm}
      style={{
        fontSize: "12px",
        border: "1px solid #1976d2",
        textAlign: "center",
      }}
    >
      Xác nhận nhận tiền từ nhân viên
    </Button>
  );
};

export default ConfirmPayment;

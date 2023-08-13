import React from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CashCheckoutButton = (props) => {
  const nav = useNavigate();
  const bill = props.items;

  const handleOpen = async () => {
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "customer/create-bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bill),
    });

    if (res.status === 400) {
      Swal.fire({
        title: "Bạn đã đặt đơn hàng này",
        icon: "error",
        confirmButtonText: "Close",
      });
    } else {
      Swal.fire({
        title: "Đặt đơn hàng thành công",
        icon: "success",
        confirmButtonText: "Close",
      });
    }
    sessionStorage.removeItem("cart");
    nav("/user");
  };

  return (
    <Grid container spacing={0} marginTop={3}>
      <Grid item xs={12}>
        <p>
          <strong>Lưu ý: </strong>Thanh toán sau khi nhân viên đã hoàn thành
          công việc
        </p>
      </Grid>
      <Grid item xs={12} container flex justifyContent={"center"}>
        <Button
          variant="contained"
          onClick={() => handleOpen()}
          sx={{
            fontFamily: "Montserrat",
            backgroundColor: "#397F77",
            color: "#ffffff",
            letterSpacing: "0.07rem",
            width: "250px",
            "&:hover": {
              backgroundColor: "#397F77",
            },
          }}
        >
          Thanh toán
        </Button>
      </Grid>
    </Grid>
  );
};

export default CashCheckoutButton;

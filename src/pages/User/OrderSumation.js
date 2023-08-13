import React from "react";
import { Button, Divider, Grid } from "@mui/material";
import "./OrderSumation.css";
import { MdPayments } from "react-icons/md";
import { BsFillBackspaceFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OrderSumation = () => {
  const nav = useNavigate();
  const cartItems = JSON.parse(sessionStorage.getItem("cart"));
  const checkoutHandler = () => {
    if (!cartItems) {
      Swal.fire({
        title: "Bạn chưa đặt đơn nào",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    nav("/user/order");
  };
  const removeItemHandler = () => {
    sessionStorage.removeItem("cart");
    nav("");
  };
  return (
    <>
      <div className="hh-total col-md-6">
        <h5
          style={{
            fontFamily: "Montserrat",
            fontWeight: "lighter",
            fontSize: "28px",
          }}
        >
          Thông tin đơn hàng
        </h5>
        <div className="total-infor">
          {cartItems && (
            <div className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <div className="ms-3">
                      <h5>{cartItems.name}</h5>
                      <p className="small mb-0">{cartItems.type}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <div style={{ width: 100 }}>
                      <h5
                        className="mb-0"
                        style={{
                          fontSize: "15px",
                          marginTop: "2rem",
                          marginRight: "10%",
                        }}
                      >
                        {cartItems.price.toLocaleString()} VNĐ
                      </h5>
                    </div>
                    <BsFillBackspaceFill
                      style={{
                        fontSize: "20px",
                        color: "#cc0000",
                        cursor: "pointer",
                        marginTop: "2rem",
                      }}
                      onClick={removeItemHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Divider sx={{ borderBottomWidth: 1, backgroundColor: "black" }} />
        <div className="total-cost">
          {cartItems ? (
            <>
              <p>
                Đơn giá: <span>{cartItems.price.toLocaleString()} VNĐ</span>
              </p>

              <p>
                Thành tiền:
                <span>{cartItems.price.toLocaleString()} VND</span>
              </p>
            </>
          ) : (
            <p>Chưa có đơn hàng</p>
          )}
        </div>
        <Divider
          sx={{
            borderBottomWidth: 1,
            backgroundColor: "black",
            marginBottom: "4%",
          }}
        />

        <Grid container>
          <Grid item xs={3} marginBottom={7}></Grid>
          <Grid item xs={6}>
            <Button
              onClick={checkoutHandler}
              variant="contained"
              startIcon={<MdPayments color="white" />}
              sx={{
                backgroundColor: "#397F77",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#397F77",
                },
              }}
            >
              Thanh toán
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default OrderSumation;

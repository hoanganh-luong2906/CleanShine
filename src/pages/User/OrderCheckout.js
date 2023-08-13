import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import PaymentPicker from "../../components/User/PaymentPicker";
import PaypalCheckoutButton from "../../components/User/PaypalCheckoutButton";
import { Box, Container, Divider, Grid } from "@mui/material";
import Title from "../../components/Title";
import CashCheckoutButton from "../../components/User/CashCheckoutButton";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdLocationOn } from "react-icons/md";

const OrderCheckout = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const cartItems = JSON.parse(sessionStorage.getItem("cart"));
  const [payment, setPayment] = useState("Tiền mặt");
  const [bill, setBill] = useState({});
  useEffect(() => {
    handleBill();
  }, [payment]);

  const handleBill = () => {
    let bill = {
      customerId: user.id,
      serviceDetailId: cartItems.serviceDetailId,
      dateOrder: cartItems.dateOrder,
      dateImplement: cartItems.dateImplement,
      timeStart: cartItems.timeStart,
      timeEnd: cartItems.timeEnd,
      payment: payment,
      note: cartItems.note,
      employeeId: 0,
      roomId: data.roomId,
    };
    setBill(bill);
  };

  const paymentHandler = (props) => {
    setPayment(props);
  };
  return (
    <>
      <Box container flex>
        <Grid container flex justifyContent={"center"}>
          <Grid item xs={12}>
            <Title
              title="Thanh Toán"
              color="#397f77"
              fontSize="35px"
              fontWeight="1000"
            />
          </Grid>
          <Grid>
            {" "}
            <h4 style={{ fontStyle: "italic", fontWeight: "400" }}>
              Vui lòng kiểm tra lại thông tin trước khi đặt hàng
            </h4>
          </Grid>
        </Grid>
        <Container>
          <div className="line"></div>
          <Grid>
            <Card>
              <Grid container>
                <MdLocationOn fontSize={25} />
                <Grid item xs={5}>
                  <h5>Địa điểm làm việc</h5>
                </Grid>
                <Grid item xs={10}>
                  <p>
                    Tòa {data.buildingNumber}.{data.roomNumber}, Vinhomes Grand
                    Park, Phường Long Thạch Mỹ, Quận 9, TP.Hồ Chí Minh.
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <h5
                    style={{
                      color: "#397f77",
                    }}
                  >
                    Thông tin đơn hàng
                  </h5>
                </Grid>

                {cartItems && (
                  <Grid
                    container
                    spacing={2}
                    paddingTop={1}
                    key={cartItems.businessId}
                  >
                    <Grid item xs={12}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1,
                          backgroundColor: "black",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} container>
                      <Grid item xs={4}>
                        <Grid>
                          <h5>Công việc</h5>
                        </Grid>
                        <Grid>
                          <p>
                            {cartItems.name} - {cartItems.type}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <Grid>
                          <h5>Thời gian</h5>
                        </Grid>
                        <Grid>
                          <p>
                            {cartItems.timeStart} - {cartItems.timeEnd}
                          </p>
                        </Grid>
                      </Grid>

                      <Grid item xs={2}>
                        <Grid>
                          <h5>Thành tiền</h5>
                        </Grid>
                        <Grid>
                          <p>{cartItems.price.toLocaleString()} VNĐ</p>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} container flex>
                        <Grid paddingRight={2}>
                          <h5>Ghi chú:</h5>
                        </Grid>

                        <Grid item xs={12}>
                          <p>{cartItems.note}</p>
                        </Grid>
                      </Grid>
                      <Grid items xs={12} paddingTop={2} paddingBottom={2}>
                        <h5
                          style={{
                            color: "#397f77",
                          }}
                        >
                          Phương thức thanh toán
                        </h5>
                        <PaymentPicker onAddPayment={paymentHandler} />
                        {payment === "Tiền mặt" ? (
                          <CashCheckoutButton items={bill} />
                        ) : (
                          <PaypalCheckoutButton items={bill} />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Card>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default OrderCheckout;

import { TextField } from "@mui/material";
import React, { useState } from "react";
import PaymentPicker from "./PaymentPicker";
import { Link } from "react-router-dom";

const Confirm = (props) => {
  const [selectedPayment, setSelectedPayment] = useState("Tiền mặt");
  const paymentHandler = (e) => {
    setSelectedPayment(e);
    props.onAddPayment(e);
  };
  return (
    <>
      <div className="row d-flex mt-3">
        <div className="col-md-6 d-flex row location">
          <p className="text-center">Thông tin liên lạc</p>
          <TextField
            className="col-md-11"
            variant="outlined"
            label="Số tòa"
            defaultValue="S1.06"
            margin="normal"
            aria-readonly
            // onClick
          />
          <TextField
            className="col-md-11"
            variant="outlined"
            label="Số phòng"
            defaultValue="1412"
            margin="normal"
            aria-readonly
            // onChange
          />
          <TextField
            className="col-md-11"
            variant="outlined"
            label="Số điện thoại"
            defaultValue="0977545450"
            margin="normal"
            aria-readonly
            // onChange
          />
        </div>
        <div className="col-md-6 row payment">
          <p className="text-center">Phương thức thanh toán</p>
          <PaymentPicker onAddPayment={(payment) => paymentHandler(payment)} />
        </div>
      </div>
      <div className="row mt-4 justify-content-center" id="finish">
        <button className="col-5">
          <Link to="..">QUAY LẠI</Link>
        </button>
        <button className="col-5">HOÀN THÀNH ĐƠN HÀNG</button>
      </div>
    </>
  );
};

export default Confirm;

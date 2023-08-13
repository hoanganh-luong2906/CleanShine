import { Button } from "@mui/material";
import React, { useState } from "react";

const payMethod = ["Tiền mặt", "PayPal"];
const PaymentPicker = (props) => {
  const [selectedPayment, setSelectedPayment] = useState("Tiền mặt");
  const paymentHandler = (method) => {
    setSelectedPayment(method);
    props.onAddPayment(method);
  };

  return (
    <div
      className="row col-md-12 hh-submit"
      style={{ marginTop: "2%", justifyContent: "center" }}
    >
      {payMethod.map((method) => (
        <div
          className="col-md-5 d-flex justify-content-center hh-payment"
          key={method}
        >
          <Button
            size="small"
            onClick={() => paymentHandler(method)}
            style={{
              width: "150px",
              color: selectedPayment === method ? "white" : "black",
              backgroundColor: selectedPayment === method ? "#397f77" : "",
              border: selectedPayment === method ? " " : "1px solid #397f77",
              fontWeight: selectedPayment === method ? "500" : "normal",
              variant: "contained",
            }}
          >
            {method}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PaymentPicker;

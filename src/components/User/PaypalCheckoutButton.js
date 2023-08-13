import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const PaypalCheckoutButton = (props) => {
  const nav = useNavigate();
  const cartItems = JSON.parse(sessionStorage.getItem("cart"));
  const [payFor, setPayFor] = useState(false);
  const [error, setError] = useState(null);
  const ConversionRate = 1 / 23000;
  const bill = props.items;
  let usdValue = parseFloat(cartItems.price) * ConversionRate;
  const handleApprove = async () => {
    setPayFor(true);
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    let billApprove = props.items;
    billApprove.payment = "PayPal";
    const res = await fetch(apiUrl + "customer/create-bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(billApprove),
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

  const product = {
    description: "abc",
    price: usdValue.toFixed(2),
  };
  return (
    <div
      className="container"
      style={{
        width: "260px",
        marginTop: "42px",
      }}
    >
      <PayPalButtons
        style={{
          color: "silver",
          layout: "horizontal",
          height: 40,
          tagline: false,
        }}
        onClick={(data, action) => {
          const hasAlreadyPay = false;
          if (hasAlreadyPay) {
            setError("You already pay");
            return action.reject();
          } else {
            return action.resolve();
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: product.price,
                },
              },
            ],
          });
        }}
        onCancel={() => {}}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          handleApprove();
        }}
        onError={(err) => {
          setError(err);
          console.error("Lỗi Paypal", err);
        }}
      />
    </div>
  );
};

export default PaypalCheckoutButton;

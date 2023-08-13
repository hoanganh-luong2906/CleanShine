import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Title";
import { Card, CardMedia } from "@mui/material";
const UserServiceCard = (props) => {
  const nav = useNavigate();
  const clickHandler = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    let req = {
      id: props.id,
    };
    const response = await fetch(apiUrl + "service-detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("service-detail", JSON.stringify(data));
      nav("/user/service-detail");
    }
  };
  return (
    <div className="col-lg-3 col-sm-12 py-3 my-3" onClick={clickHandler}>
      <Card
        sx={{
          width: "80%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderRadius: "5%",
        }}
      >
        <CardMedia component="img" image={props.img} sx={{ opacity: "70", width: "130px !important"}} />
      </Card>
      <div className="container" style={{marginTop: "4%", display: "flex", justifyContent: "flex-start"}}> 
      <Title
        title={props.title}
        color="#000000"
        fontSize="18px"
        fontWeight="lighter"
      />
      </div>

    </div>
  );
};

export default UserServiceCard;

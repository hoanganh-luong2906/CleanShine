import React from "react";
import Title from "../../components/Title";
import UserServiceCard from "../../components/User/UserServiceCard";
import { useLoaderData } from "react-router-dom";
const HomeService = () => {
  const data = useLoaderData();
  return (
    <div
      className="container"
      style={{
        height: "70vh !important",
      }}
    >
      <Title
        title="DỊCH VỤ VỆ SINH"
        color="#397f77"
        fontSize="34px"
        fontWeight="2000"
        padding="0"
      />
      <div className="container">
        <div className="row">
          {data.map((ser) => (
            <UserServiceCard img={ser.linkIcon} title={ser.name} id={ser.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeService;
export async function serviceLoader() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "services");
  if (!res.ok) {
    throw new Error("error");
  } else {
    const data = await res.json();
    return data;
  }
}

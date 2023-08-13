import React from "react";
import SignUpForm from "../components/SignUpForm";
import { useLoaderData } from "react-router-dom";
const SignUpPage = () => {
  const data = useLoaderData();
  return (
    <div className="container-fluid signin-bg">
      <div className="row justify-content-left align-items-left">
        <SignUpForm data={data} />
      </div>
    </div>
  );
};

export default SignUpPage;
export async function departmentLoader() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "departments");
  if (!res.ok) {
    throw new Error("can not load department");
  } else {
    const data = await res.json();
    return data;
  }
}

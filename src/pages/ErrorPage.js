import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
const ErrorPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <p className="text-danger">
            Trang hiện đang lỗi, chúng tôi sẽ cố gắng khắc phục trong thời gian
            nhanh nhất!
          </p>
          <img src="/assets/images/404-error.svg" alt="error"></img>
        </p>
        <p className="text-dark">Xin lỗi bạn vì sự bất tiện này.</p>
        <Link to="">
          <Button
            backgroundColor="#BFE3F2"
            borderRadius="15px"
            padding="16px 41px"
          >
            Trở về trang chủ
          </Button>
        </Link>
      </div>
    </div>
    // <>

    // </>
  );
};

export default ErrorPage;

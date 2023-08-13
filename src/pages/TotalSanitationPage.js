import React from "react";
import Button from "../UI/Button";
import Title from "../components/Title";
import "./AllServices.css";
import { Link } from "react-router-dom";
const TotalSanitationPage = () => {
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
          <div>
            <h3 className="title">Dịch Vụ Tổng Vệ Sinh</h3>
            <p className="text-detail">
              Dịch vụ tổng vệ sinh dọn dẹp nhà cửa giúp Khách hàng có môi trường
              sống trong lành. Hơn 200.000 Khách hàng đã sử dụng và hài lòng về
              dịch vụ tổng vệ sinh của CleanShine.
            </p>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <img
            src="/assets/images/sanitation.svg"
            className="w-100"
            alt="img"
          />
        </div>
      </div>
      <div className="row my-5">
        <div className="col-lg-6 col-sm-12">
          <img
            src="/assets/images/sanitation cleaning.svg"
            alt="img"
            className="w-100"
          />
        </div>
        <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
          <div>
            <h3 className="title">
              Dịch Vụ Tổng Vệ Sinh Nhà Cửa CleanShine Sẽ Bao Gồm:
            </h3>
            <p className="text-detail">
              Dọn dẹp toàn bộ nhà cửa kĩ càng các phòng bếp, khách, ngủ, nhà vệ
              sinh hoặc tổng vệ sinh dọn dẹp nhà cửa theo nhu cầu của Khách
              hàng.
              <br /> Mỗi gói gồm 02 nhân viên làm trong 4h + 01 giám sát nghiệm
              thu
              <br /> Sử dụng các loại hóa chất làm sạch & thiết bị chuyên dụng
            </p>
            <Button
              backgroundColor="#397F77"
              borderRadius="15px"
              padding="16px 41px"
            >
              <Link to="/sign-in" style={{ textDecoration: "none" }}>
                <Title
                  color="#FFFFFF"
                  title="Đặt dịch vụ ngay"
                  fontSize="20px"
                  fontWeight="600"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
          <div>
            <h3 className="title">
              Tại Sao Cần Tổng Vệ Sinh Nhà Cửa Thường Xuyên?
            </h3>
            <ul className="text-detail">
              <li>Đảm bảo môi trường sống trong lành, sạch sẽ</li>
              <li>Loại bỏ các loại bụi bẩn bám lâu ngày trong nhà</li>
              <li>Đảm bảo sức khoẻ cho các thành viên trong gia đình</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <img
            src="/assets/images/dust allergy.svg"
            alt="img"
            style={{
              width: "500px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalSanitationPage;

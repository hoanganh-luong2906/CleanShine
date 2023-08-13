import React from "react";
import Button from "../UI/Button";
import Title from "../components/Title";
import "./AllServices.css";
import { Link } from "react-router-dom";
const ElectronicCleaningPage = () => {
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-lg-6 col-sm-12">
          <h3 className="title">
            Dịch Vụ Vệ Sinh Điều Hòa Tại Nhà Chuyên Nghiệp, Uy Tín
          </h3>
          <p className="text-detail">
            Với đội ngũ kỹ thuật viên có trình độ chuyên môn cao, chúng tôi tự
            tin sẽ giúp bạn vệ sinh điều hòa tại nhà nhanh chóng, dễ dàng.
          </p>
          <p className="text-detail">
            Hiện tại, dịch vụ vệ sinh Điện máy chỉ phục vụ tại Hà Nội, Tp.Hồ Chí
            Minh.
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <img
            src="https://cdn.jupviec.vn/sec1_1900_09eb73895b.jpg"
            alt="img"
            className="w-100"
          />
        </div>
      </div>
      <div className="row my-5">
        <div className="col-lg-6 col-sm-12">
          <img
            src="/assets/images/contentchung.svg"
            alt="img"
            className="w-100"
          />
        </div>
        <div className="col-lg-6 col-sm-12">
          <h3 className="title">Giới Thiệu</h3>
          <p className="text-detail">
            Chỉ với một vài thao tác đơn giản trên ứng dụng, Khách hàng đã tìm
            được Dịch vụ Vệ sinh điều hòa uy tín, chuyên nghiệp với nhiều ưu đãi
            hấp dẫn.
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
      <div className="row my-5">
        <div className="col-lg-6 col-sm-12">
          <h3 className="title">Tại Sao Cần Vệ Sinh Điều Hòa Thường Xuyên?</h3>
          <ul className="text-detail">
            <li>Loại bỏ các loại vi khuẩn gây bệnh tích tụ lâu ngày</li>
            <li>Tiết kiệm điện năng</li>
            <li>Kéo dài tuổi thọ, công suất sử dụng của máy</li>
            <li>Bảo vệ sức khỏe gia đình</li>
          </ul>
        </div>
        <div className="col-lg-6 col-sm-12">
          <img
            src="/assets/images/suamaylanh.svg"
            alt="img"
            className="w-100"
          />
        </div>
      </div>
    </div>
  );
};

export default ElectronicCleaningPage;

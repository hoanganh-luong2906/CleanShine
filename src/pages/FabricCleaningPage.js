import React from "react";
import Button from "../UI/Button";
import Title from "../components/Title";
import "./AllServices.css";
import { Link } from "react-router-dom";
const FabricCleaningPage = () => {
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-lg-6 col-sm-12">
          <h3 className="title">Dịch Vụ Vệ Sinh Sofa Tại Nhà Chuyên Nghiệp</h3>
          <p className="text-detail">
            CleanShine - Dịch vụ vệ sinh Sofa, đệm, rèm, thảm sử dụng công nghệ
            tiên tiến từ Đức giúp làm sạch sâu các vết ố bẩn, nấm mốc, ố vàng.
            Hơn 2.000 Khách hàng đã tin tưởng và sử dụng dịch vụ của chúng tôi.
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <img
            src="/assets/images/done-animate.svg"
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
        <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
          <div>
            {" "}
            <h3 className="title">Giới Thiệu</h3>
            <p className="text-detail">
              CleanShine - Dịch vụ vệ sinh Sofa, đệm, rèm, thảm sử dụng công
              nghệ tiên tiến từ Đức được Khách hàng tin tưởng và sử dụng trong
              suốt thời gian qua.
              <br /> Chỉ với một vài thao tác đơn giản trên ứng dụng, Khách hàng
              đã tìm được Dịch vụ Vệ sinh Sofa uy tín, chuyên nghiệp với nhiều
              ưu đãi hấp dẫn.
              <br /> Hiện tại CleanShine - Dịch vụ Sofa cung cấp dịch vụ tại Hà
              Nội, Tp.Hồ Chí Minh, Hải Phòng.
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
            <h3 className="title">Tại Sao Cần Vệ Sinh Sofa Thường Xuyên?</h3>
            <ul className="text-detail">
              <li>Loại bỏ các loại vi khuẩn gây bệnh tích tụ lâu ngày</li>
              <li>Giữ cho ghế Sofa luôn mới</li>
              <li>Nâng cao tuổi thọ Sofa, tiết kiệm chi phí thay đổi</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <img
            src="/assets/images/living-room-animate.svg"
            alt="img"
            className="w-100"
          />
        </div>
      </div>
    </div>
  );
};

export default FabricCleaningPage;

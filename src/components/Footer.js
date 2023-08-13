import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-md-4" style={{ textAlign: "justify" }}>
            <h3 className="text-lg font-bold mb-2">ĐỊA CHỈ</h3>
            <p>
              Vinhomes Grand Park,
              <br />
              Thành phố Thủ Đức, <br />
              Việt Nam{" "}
            </p>
          </div>
          <div
            className="col-md-4 contact-info"
            style={{ textAlign: "justify" }}
          >
            <h3 className="text-lg font-bold mb-2">LIÊN HỆ</h3>
            <p>Tổng đài: 1800 1883</p>
            <p>(8:00 - 21:00, Thứ 2 - CN)</p>
            <div className="contact-info__wrapper">
              <p className="contact-info__text">Clean Shine</p>
            </div>
          </div>
          <div className="col-md-4" style={{ textAlign: "justify" }}>
            <h3 className="text-lg font-bold mb-2">HỖ TRỢ KHÁCH HÀNG</h3>
            <p>Câu hỏi thường gặp</p>
            <p>Chính sách bảo mật</p>
            <p>Quy định và điều khoản</p>
          </div>
        </div>
        <div className="col-md-12">
          <p className="text-muted text-center">© Copyright 2023 CleanShine</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

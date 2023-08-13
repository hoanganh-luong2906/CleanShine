import React from "react";
import Title from "./Title";
import Benefit from "./Benefit";
import "bootstrap/dist/css/bootstrap.min.css";
const WhyUs = () => {
  return (
    <>
      <Title
        color="#015450"
        title="TẠI SAO CHỌN CHÚNG TÔI"
        fontSize="40px"
        fontWeight="700"
      />
      <div className="row justify-content-around">
        <div className="col-md-6">
          <Benefit
            image="assets/images/clock.svg"
            title="Đặt lịch nhanh "
            content="Chúng tôi đảm bảo tiếp nhận và xử lí thông tin cũng như xác nhận cung cấp dịch vụ cho khách hàng trong vòng 60 phút."
          />
        </div>
        <div className="col-md-6">
          <Benefit
            image="assets/images/cashless.svg"
            title="Giá cả rõ ràng"
            content="Chúng tôi hiển thị phí dịch vụ và báo giá rõ ràng theo từng sản phẩm dịch vụ yêu cầu."
          />
        </div>
        <div className="col-md-6">
          <Benefit
            image="assets/images/cleaning-service.svg"
            title="Đa dạng dịch vụ"
            content="Chúng tôi cung cấp đa dạng các dịch vụ vệ sinh như tạp vụ vệ sinh thường xuyên, theo giờ, theo ngày. Chúng tôi tự tin có thể đáp ứng mọi yêu cầu của khách hàng."
          />
        </div>
        <div className="col-md-6">
          <Benefit
            image="assets/images/safety.svg"
            title="An toàn & chất lượng "
            content="Chúng tôi cam kết đảm bảo quyền lợi khách hàng với chất lượng dịch vụ cao, và sử dụng các loại hóa chất an toàn cho sức khỏe và thân thiện với môi trường."
          />
        </div>
      </div>
    </>
  );
};

export default WhyUs;

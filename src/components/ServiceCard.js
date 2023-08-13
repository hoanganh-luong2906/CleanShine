import React from "react";
import "./ServiceCard.css";
import ServiceItem from "./ServiceItem";

const SERVICE = [
  {
    image: "assets/images/cleaning-product.svg",
    title: "TẠP VỤ VỆ SINH",
    content:
      "Là đơn vị hàng đầu chuyên cung cấp dịch vụ vệ sinh hàng ngày hoặc theo giờ chuyên nghiệp.",
    link: "/sign-in",
  },
  {
    image: "assets/images/globe.svg",
    title: "VỆ SINH THIẾT BỊ",
    content:
      "Đội ngũ kỹ thuật được đào tạo bài bản, có kinh nghiệm trong việc nắm bắt và sự lý sự cố.",
    link: "/sign-in",
  },
  {
    image: "assets/images/qualification.svg",
    title: "BẢO HÀNH DỌN DẸP",
    content:
      "Đảm bảo chính sách bảo hành đối với việc vệ sinh những thiết bị gia dụng thông minh.",
    link: "/sign-in",
  },
];
const ServiceCard = () => {
  return (
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {SERVICE.map((item) => (
          <ServiceItem
            key={item.title}
            image={item.image}
            title={item.title}
            content={item.content}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;

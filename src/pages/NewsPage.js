import React from "react";
import Title from "../components/Title";
import NewsItem from "../components/NewsItem";

const NewsPage = () => {
  return (
    <>
      <Title color="#015450" fontSize="50px" fontWeight="600" title="TIN TỨC" />
      <div className="container">
        <NewsItem
          image="https://cdn.jupviec.vn/medium_11_b2b47e6380.png"
          title="TRỞ THÀNH NHÂN VIÊN GIÚP VIỆC CHUYÊN NGHIỆP"
          date="19/2/2023"
          content="Bạn đang tìm kiếm công việc làm ổn định và có thu nhập tốt? Bạn cần tìm kiếm công việc mà ở đó bạn được tự chủ quyết định thời gian phù hợp với cuộc sống gia đình mình? Chào mừng bạn đã đến với CleanShine."
        />
        <NewsItem
          image="https://cdn.tgdd.vn/Files/2021/01/21/1321817/lam-sach-luoi-loc-may-hut-mui-nhanh-chong-voi-cac-nguyen-lieu-san-co-202202161633288535.jpg"
          title="MẸO VỆ SINH MÁY HÚT MÙI NHANH GỌN TẠI NHÀ "
          date="30/2/2023"
          content="Pha 1 lít nước với 1/2 cốc bột baking soda sẽ tạo thành dung dịch tẩy các chất dầu mỡ rất hữu hiệu. Đun sôi tấm lọc với hỗn hợp trên khoảng 20-30 phút đến khi tấm lọc sáng bóng thì bạn tắt bếp. Sau đó, bạn lau chùi lại tấm lọc bằng nước ấm pha xà phòng là xong."
        />
        <NewsItem
          image="https://baya.vn/wp/wp-content/uploads/2020/10/ve-sinh-ghe-sofa-ni-hieu-qua.jpg"
          title="CÁCH VỆ SINH SOFA HIỆU QUẢ TẠI NHÀ"
          date="19/2/2023"
          content="Bước 1: Dùng máy hút bụi hút toàn bộ bề mặt và các kẽ của ghế sofa. Bước 2: Cho vài giọt xà phòng dưỡng ẩm vào khăn ẩm mềm và lau nhẹ nhàng toàn bộ bề mặt ghế sofa. Bước 3: Lau lại bằng khăn khô, lặp lại quá trình cho tới khi sofa được làm sạch hoàn toàn."
        />
        <NewsItem
          image="https://cdn.tgdd.vn/Files/2021/03/16/1335782/chu-dong-phong-ngua-6-benh-tre-em-de-mac-vao-mua-he-.jpg"
          title="BÍ QUYẾT BẢO VỆ SỨC KHOẺ CỦA TRẺ TRONG MÙA HÈ "
          date="19/2/2023"
          content="Uống đủ nước giúp bảo vệ sức khỏe cho trẻ,
          giữ gìn vệ sinh sạch sẽ giúp bảo vệ sức khỏe và đường hô hấp cho trẻ,
          tránh thay đổi nhiệt độ đột ngột.
          Không bật điều hòa 24/24h giúp bảo vệ sức khỏe cho trẻ,
          lựa chọn cho trẻ trang phục sáng màu, mát mẻ.
          Hạn chế cho ăn đồ ăn nhiều dầu mỡ."
        />
        {/* <nav aria-label="Page navigation">
          <ul class="pagination pg-blue justify-content-end">
            <li class="page-item disabled">
              <a class="page-link" href="#previous" tabindex="-1">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#new1">1</a></li>
            <li class="page-item"><a class="page-link" href="#new2">2</a></li>
            <li class="page-item"><a class="page-link" href="#new3">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#next">Next</a>
            </li>
          </ul>
        </nav> */}
      </div>
    </>
  );
};

export default NewsPage;

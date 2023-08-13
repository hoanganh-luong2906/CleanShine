import React from "react";
import Title from "./Title";
import "./Feedback.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 3
  }
}

const Feedback = () => {
  return (
    <>
      <Title
        color="#015450"
        title="PHẢN HỒI CỦA KHÁCH HÀNG"
        fontFamily="SourceSerifPro"
        fontSize="40px"
        fontWeight="700"
      />
      <div className="container container-feedback">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          deviceType
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div
            className="fb-container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
              padding: "14%",
              position: "relative"
            }}
          >
            <div className="fb-content">
              <img src="assets/images/avatar3.jpg" alt=""className="rounded-circle"></img>
              <h3 className="text-center">An Khoa</h3>
              <p>Mình không phải khách hàng thường xuyên của CleanShine,
                chỉ thi thoảng bận bịu quá không dọn được nhà thì mới
                nhấc điện thoại lên đặt buổi lẻ. Tóm lại là dùng được, có thể
                recommend cho những người khác. Thanks!</p>
            </div>
          </div>

          <div
            className="fb-container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
              padding: "14%",
              position: "relative"
            }}
          >
            <div className="fb-content">
              <img src="assets/images/avatar5.jpg" alt=""className="rounded-circle"></img>
              <h3 className="text-center">Thiên An</h3>
              <p>Cảm ơn dịch vụ CleanShine đã giúp mình có nhiều thời gian rảnh tận hưởng cuộc sống.</p>
            </div>
          </div>

          <div
            className="fb-container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
              padding: "14%",
              position: "relative"
            }}
          >
            <div className="fb-content">
              <img src="/assets/images/avatar4.jpg" alt="" className="rounded-circle"></img>
              <h3 className="text-center">Thanh Mai</h3>
              <p>CleanShine là dịch vụ dọn dẹp yêu thích của mình khi dành riêng cho cư dân Vinhomes Grand Park. 
                Mình rất hài lòng về chất lượng dịch vụ, cũng như sự chuyên nghiệp của nhân viên. Cảm ơn CleanShine đã giúp đỡ 
                mình rất nhiều trong việc dọn dẹp.
              </p>
            </div>
          </div>

          <div
            className="fb-container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
              padding: "14%",
              position: "relative"
            }}
          >
            <div className="fb-content">
              <img src="assets/images/avatar6.jpg" alt=""className="rounded-circle"></img>
              <h3 className="text-center">Hoàng Anh</h3>
              <p>Mình hay đặt dịch vụ của CleanShine, nhờ vậy mà mình có nhiều thời gian rảnh hơn.
              Về chất lượng dọn dẹp mình đánh giá khá tốt, rất sạch sẽ và mình hài lòng về điều này. Chúc CleanShine ngày
              càng phát triển hơn!
              </p>
            </div>
          </div>

          <div
            className="fb-container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
              padding: "14%",
              position: "relative"
            }}
          >
            <div className="fb-content">
              <img src="assets/images/avatar1.jpg" alt=""className="rounded-circle"></img>
              <h3 className="text-center">Ngọc Như </h3>
              <p>CleanShine có đa dạng dịch vụ và điều này đã giúp mình rất nhiều. Mình không còn 
                phải lăn tăn khi kiếm dịch vụ nữa vì mình đã chọn và tin tưởng ở CleanShine. </p>
            </div>
          </div>

          <div
            className="fb-container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
              padding: "14%",
              position: "relative"
            }}
          >
            <div className="fb-content">
              <img src="assets/images/avatar2.jpg" alt=""className="rounded-circle"></img>
              <h3 className="text-center">Trần Giao</h3>
              <p>Dịch vụ tốt, rất xứng đáng để bạn thử đặt dịch vụ mỗi khi bận rộn. Nhân viên chuyên nghiệp,
                thái độ phục vụ rất tốt. Thanks!
              </p>
            </div>
          </div>

        </Carousel>
      </div>
    </>
  );
};

export default Feedback;

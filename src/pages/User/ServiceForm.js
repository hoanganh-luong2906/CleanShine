import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FabricCleaning.css";
import Title from "../../components/Title";
import { Link } from "react-router-dom";
const ServiceForm = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const showHandler = (e) => {
    e.preventDefault();
  };
  const fetchEvent = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container-fluid fabric-container">
      <nav className="navbar navbar-expand-lg fabric-nav">
        <h1 className="text-center fabric-title">{props.title}</h1>
      </nav>
      <form onSubmit={fetchEvent}>
        <div className="gy-lg-5 input service-form">
          <div className="col-lg-12">
            <label className="schedule-input">Ngày làm việc</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="fabric-schedule mt-3 mb-4 form-control"
              placeholderText="Chọn ngày"
            />
            <div>
              <label className="schedule-input" style={{ marginRight: "30px" }}>
                Giờ làm việc
              </label>

              <select
                value={selectedValue}
                onChange={handleChange}
                className="mb-4"
              >
                <option value="morning">Sáng (8h-9h)</option>
                <option value="afternoon">Chiều (13h-14h)</option>
                <option value="night">Tối(17h-18h)</option>
              </select>
            </div>

            <div className="mb-4">
              <button onClick={showHandler}>
                <Title
                  color="#000000"
                  title="Xem giá"
                  fontSize="20px"
                  fontWeight="600"
                />
              </button>
            </div>
            <label className="schedule-input">Ghi chú</label>
            <div className="mt-3 input-group">
              <textarea
                type="text"
                className="form-control mb-4"
                style={{ minHeight: "120px" }}
              />
            </div>
            <div className="mb-4 row text-center">
              <div className="col-sm-6 mb-3">
                <button>
                  <Title
                    color="#000000"
                    title="Đăng ký"
                    fontSize="20px"
                    fontWeight="600"
                  />
                </button>
              </div>
              <div className="col-sm-6 mb-3">
                <button>
                  <Link style={{ textDecoration: "none" }} to="..">
                    <Title
                      color="#000000"
                      title="Quay lại"
                      fontSize="20px"
                      fontWeight="600"
                    />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddEmployeeForm = (props) => {
  useEffect(() => {
    const loadDepartments = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(apiUrl + "services");
      const data = await res.json();
      const WORKTYPE = data.map((e) => ({
        value: e.id,
        label: e.name,
      }));
      setWorkType(WORKTYPE);
    };
    loadDepartments();
  }, []);
  const nav = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workType, setWorkType] = useState([]);
  const [work, setWork] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const workTypeHandler = (event) => {
    setWork(event.target.value);
  };

  const handleAddEmployee = async () => {
    if (email === "" || password === "" || work === "") {
      Swal.fire({
        title: "Điền đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    if (name.length < 0 || name.length > 25) {
      Swal.fire({
        title: "Tên có độ dài dưới 25 ký tự",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    if (phone.length !== 10) {
      Swal.fire({
        title: "Số điện thoại có độ dài 10 ký tự",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    if (!/^[\w-.]+@gmail\.com$/i.test(email)) {
      Swal.fire({
        title: "Nhập đúng định dạng email",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    let employee = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      serviceId: work,
    };
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/create-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employee),
    });
    if (res.ok) {
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      Swal.fire({
        title: "Thêm nhân viên thành công",
        icon: "success",
        confirmButtonText: "Close",
      });
      nav(location.pathname);
    } else {
      Swal.fire({
        title: "Thêm nhân viên thất bại",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <div
      className="modal fade"
      id="AddModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{
        borderRadius: "5px",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Thêm nhân viên
            </h1>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body row container d-flex justify-content-center">
            <h5>{props.workType}</h5>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="fullName">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="eMail">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label htmlFor="phone">Công việc</label>
                <select
                  class="form-select"
                  onChange={workTypeHandler}
                  aria-label="Default select example"
                >
                  <option selected>Chọn loại công việc</option>
                  {workType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleAddEmployee}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;

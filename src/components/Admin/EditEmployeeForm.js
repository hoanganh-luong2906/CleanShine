import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditEmployeeForm = (props) => {
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
  const [workType, setWorkType] = useState([]);
  const [work, setWork] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName(props.employee.employeeInfo?.name || "");
    setPhone(props.employee.employeeInfo?.phone || "");
  }, [props]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const workTypeHandler = (event) => {
    setWork(event.target.value);
  };
  const saveEmployeeHandler = async () => {
    const employeeInfo = {
      id: props.employee.employeeInfo.id,
      name: name,
      phone: phone,
      password: password,
      serviceId: work,
    };
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/employees", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeInfo),
    });

    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    nav("/admin/edit-employee");
  };
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog find-employ">
        <div
          className="modal-content find-employ-item"
          style={{ width: "150%", transform: "translate(-16%, 0)" }}
        >
          <div className="modal-header">
            <Typography
              variant="h4"
              className="modal-title fs-5"
              id="staticBackdropLabel"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                letterSpacing: "0.05rem",
              }}
            >
              Thay đổi thông tin nhân viên
            </Typography>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row d-flex justify-content-start">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="fullName"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "2%",
                        fontFamily: "Montserrat",
                        letterSpacing: "0.05rem",
                      }}
                    >
                      Họ tên
                    </label>
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
                    <label
                      htmlFor="eMail"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "2%",
                        fontFamily: "Montserrat",
                        letterSpacing: "0.05rem",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={props.employee.employeeInfo?.email || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group" style={{ marginTop: "5%" }}>
                    <label
                      htmlFor="password"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "2%",
                        fontFamily: "Montserrat",
                        letterSpacing: "0.05rem",
                      }}
                    >
                      Password (Bỏ trống để giữ nguyên)
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="form-group" style={{ marginTop: "5%" }}>
                    <label
                      htmlFor="phone"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "2%",
                        fontFamily: "Montserrat",
                        letterSpacing: "0.05rem",
                      }}
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group" style={{ marginTop: "5%" }}>
                    <label
                      htmlFor="phone"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "2%",
                        fontFamily: "Montserrat",
                        letterSpacing: "0.05rem",
                      }}
                    >
                      Công việc
                    </label>
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
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Huỷ
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={saveEmployeeHandler}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeForm;

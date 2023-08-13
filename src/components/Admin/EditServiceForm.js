import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const EditServiceForm = (props) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    setLink(props.service.linkIcon || "");
    setName(props.service.name || "");
  }, [props.service]);
  const priceHandler = async () => {
    if (link === "") {
      Swal.fire({
        title: "Nhập đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
    let data = {
      serviceId: props.service.id,
      name: name,
      linkIcon: link,
    };
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/edit-service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error fetching data");
    } else {
      Swal.fire({
        title: "Sửa thành công",
        icon: "success",
        confirmButtonText: "Close",
      });
    }
    nav("/admin/edit-service");
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  return (
    <div
      className="modal fade "
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog find-employ">
        <div className="modal-content find-employ-item">
          <div className="modal-header">
            <h1 className="modal-title fs-5 " id="staticBackdropLabel">
              Chỉnh sửa dịch vụ
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="fullName">Công việc</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(name) => handleNameChange(name)}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="eMail">Link Icon</label>
                    <input
                      type="text"
                      className="form-control"
                      value={link}
                      onChange={(link) => handleLinkChange(link)}
                    />
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
              onClick={priceHandler}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditServiceForm;

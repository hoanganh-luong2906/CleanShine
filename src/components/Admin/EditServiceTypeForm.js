import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditServiceTypeForm = (props) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [workType, setWorkType] = useState([]);
  const [work, setWork] = useState("");
  useEffect(() => {
    setName(props.serviceType.name);
    setPrice(props.serviceType.price);
    setWork(props.serviceType.id);
  }, [props]);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const workTypeHandler = (event) => {
    setWork(event.target.value);
  };

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
  const handleEditChange = async () => {
    let DATA = {
      serviceDetailId: work,
      name: name,
      price: price,
    };
    if (name === "" || work === "") {
      Swal.fire({
        title: "Điền đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/edit-service-detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(DATA),
    });
    if (res.ok) {
      setName("");
      setWork("");
      setPrice("");
      Swal.fire({
        title: "Thêm loại dịch vụ thành công",
        icon: "success",
        confirmButtonText: "Close",
      });
      nav("/admin/service-detail");
    } else {
      Swal.fire({
        title: "Sửa thất bại",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Sửa
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Chỉnh sửa loại dịch vụ
        </DialogTitle>
        <DialogContent>
          <div className="col-12 mb-3">
            <div className="form-group">
              <label htmlFor="phone">Dịch vụ</label>
              <select
                class="form-select"
                onChange={workTypeHandler}
                aria-label="Default select example"
              >
                <option selected>Chọn loại dịch vụ</option>
                {workType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-12 mb-3">
            <div className="form-group">
              <label htmlFor="fullName">Tên</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => handleNameChange(e)}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="fullName">Giá</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => handlePriceChange(e)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleEditChange} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditServiceTypeForm;

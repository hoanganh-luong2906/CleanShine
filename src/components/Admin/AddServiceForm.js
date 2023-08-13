import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AddServiceForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [linkIcon, setIcon] = useState("");
  const nav = useNavigate();
  const location = useLocation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleIconChange = (event) => {
    setIcon(event.target.value);
  };

  const addServiceHandler = async () => {
    const data = {
      name: name,
      linkIcon: linkIcon,
    };
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/create-service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      Swal.fire({
        title: "Thêm dịch vụ thành công",
        icon: "success",
        confirmButtonText: "Close",
      });
      nav(location.pathname);
    } else {
      Swal.fire({
        title: "Thêm dịch vụ thất bại",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm dịch vụ
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thêm dịch vụ"}</DialogTitle>
        <DialogContent>
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
              <label htmlFor="fullName">Link Icon</label>
              <input
                type="text"
                className="form-control"
                value={linkIcon}
                onChange={(e) => handleIconChange(e)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={addServiceHandler} autoFocus>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddServiceForm;

import { useState } from "react";
import Title from "../../components/Title";
import "./AccountInfor.css";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import EditAddressForm from "../../components/User/EditAddressForm";
import Swal from "sweetalert2";
const AccountInfor = () => {
  const data = useLoaderData();
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phone);
  const [selectedToa, setSelectedToa] = useState(data.buildingId);
  const [selectedCanHo, setSelectedCanHo] = useState(data.roomId);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const editBuilding = (props) => {
    setSelectedToa(props);
  };
  const editRoom = (props) => {
    setSelectedCanHo(props);
  };
  const customerHandler = async () => {
    if (selectedCanHo === "" || selectedToa === "") {
      Swal.fire("Chọn toà và căn hộ");
      return;
    }
    let newCustomer = {
      id: user.id,
      name: name,
      phone: phone,
      buildingId: selectedToa,
      roomId: selectedCanHo,
    };
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "customer/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCustomer),
    });

    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    Swal.fire({
      title: "Chỉnh sửa thành công",
      icon: "success",
      confirmButtonText: "Close",
    });
    nav("/user/account-infor");
  };
  return (
    <>
      <div
        className="container"
        style={{
          height: "auto",
        }}
      >
        <Title
          title="THÔNG TIN TÀI KHOẢN"
          color="#397F77"
          fontSize="35px"
          fontWeight="1000"
        />
        <div className="row justify-content-center">
          <div className="row col-lg-8 col-sm-8 ai-content">
            <div className="row col-lg-6 col-md-12 u-infor justify-content-center align-items-center">
              <img
                className="rounded-circle"
                alt="User Image"
                src="/assets/images/avatar7.jpg"
                style={{ width: "100%", borderRadius: "50%" }}
              />
            </div>
            <div className="row col-lg-6 col-md-12 u-infor">
              <div className="col-md-12">
                <p className="custom-p">Tên</p>
                <input value={name} onChange={handleNameChange} />
              </div>
              <div className="col-md-12">
                <p className="custom-p">Email</p>
                <input value={data.email} disabled />
              </div>
              <div className="col-md-4 mt-2">
                <p className="custom-p">Tòa</p>
                <input value={data.buildingNumber} disabled />
              </div>
              <div className="col-md-4 mt-2">
                <p className="custom-p">Phòng</p>
                <input value={data.roomNumber} disabled />
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <Button
                  onClick={handleClickOpen}
                  sx={{ border: "1px solid #1976d2" }}
                >
                  Đổi địa chỉ
                </Button>
              </div>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Xác nhận đổi địa chỉ ?"}
                </DialogTitle>
                <DialogContent>
                  <EditAddressForm
                    onEditBuilding={editBuilding}
                    onEditRoom={editRoom}
                    buildingNumber={data.buildingNumber}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Hủy</Button>
                  <Button onClick={handleClose} autoFocus>
                    Đồng ý
                  </Button>
                </DialogActions>
              </Dialog>

              <div className="col-md-12">
                <p className="custom-p">Số điện thoại</p>
                <input value={phone} onChange={handlePhoneChange} />
              </div>
              <div
                className="col-md-12 d-flex justify-content-center"
                id="finish"
              >
                <Button
                  variant="contained"
                  onClick={customerHandler}
                  sx={{
                    fontFamily: "Montserrat",
                    width: "110%",
                    height: "30%",
                    mt: 5,
                    mb: 7,
                    ml: 1,
                    backgroundColor: "#397F77",
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    letterSpacing: "0.07rem",
                    "&:hover": {
                      backgroundColor: "#397F77",
                    },
                  }}
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInfor;

export async function customerInfoLoader() {
  const token = sessionStorage.getItem("jwtToken");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const request = {
    id: user.id,
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "customer/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  const data = await res.json();
  return data;
}

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const PeriodicTable = (props) => {
  const nav = useNavigate();
  const token = sessionStorage.getItem("jwtToken");
  const location = useLocation();
  const cancelFrequencyHandler = async (id) => {
    let cancelRequest = {
      id: id,
    };
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "customer/cancel-bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cancelRequest),
    });
    if (!res.ok) {
      Swal.fire({
        title: "Huỷ định kỳ thất bại",
        icon: "error",
        confirmButtonText: "Close",
      });
    }

    Swal.fire({
      title: "Huỷ định kỳ thành công",
      icon: "success",
      confirmButtonText: "Close",
    });
    nav(location.pathname);
  };
  return (
    <div className="col-md-12 ar-list p-0 table-responsive table-wrapper-scroll-y w-100  my-custom-scrollbar">
      <Table>
        <TableHead>
          <TableRow>
            {props.column.map((column) => (
              <TableCell key={column.id} align="left">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.table.map((row) => (
            <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
              <TableCell align="left">{row.business.type}</TableCell>
              <TableCell align="left">{row.business.detail}</TableCell>
              <TableCell align="left">
                {row.date}/{row.month}/2023
              </TableCell>
              <TableCell align="left">
                {row.employee ? row.employee.name : "Đang chờ xử lý"}
              </TableCell>
              <TableCell align="left">{row.payment}</TableCell>
              <TableCell align="left">
                {row.total.toLocaleString()} VNĐ
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => cancelFrequencyHandler(row.id)}
                >
                  Hủy
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PeriodicTable;

import "./EditCus.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import EditOrderForm from "../../components/Admin/EditOrderForm";
import React, { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
const OrderService = () => {
  const data = useLoaderData();
  const nav = useNavigate();
  const [serviceId, setServiceId] = useState("");
  const [billId, setBillId] = useState("");
  const [dateImp, setDate] = useState("");
  const assignEmployee = (type, id, dateImp) => {
    setServiceId(type);
    setBillId(id);
    setDate(dateImp);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const moneyConfirm = async (id) => {
    let idRq = {
      id: id,
    };
    const token = sessionStorage.getItem("jwtToken");

    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/confirm-receive-money", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(idRq),
    });

    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    Swal.fire({
      title: "Nhận tiền thành công",
      icon: "success",
      confirmButtonText: "Close",
    });
    nav("");
  };
  const column = [
    { id: "no", label: "STT", minWidth: 170 },
    { id: "name", label: "Công việc", minWidth: 170 },
    { id: "type", label: "Loại", minWidth: 170 },
    { id: "date", label: "Ngày", minWidth: 170 },
    { id: "time", label: "Giờ ", minWidth: 170 },
    { id: "customer", label: "Khách hàng", minWidth: 170 },
    { id: "staff", label: "Nhân viên", minWidth: 170 },
    { id: "phone", label: "Số điện thoại", minWidth: 170 },
    { id: "transaction", label: "Giao dịch", minWidth: 170 },
    { id: "total", label: "Tổng cộng", minWidth: 170 },
    { id: "status", label: "Trạng thái", minWidth: 170 },
    { id: "status", label: "Action", minWidth: 170 },
  ];
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          color: "#397F77",
          textAlign: "center",
          fontFamily: "Work Sans",
          fontWeight: "bold",
        }}
      >
        ĐƠN HÀNG
      </Typography>
      <Paper
        className="container"
        sx={{
          width: "100%",
          overflow: "hidden",
          justifyContent: "center",
          display: "flex-end",
          marginTop: "3%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {column.map((column) => (
                <TableCell key={column.id} align="left">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((bill) => (
                <TableRow key={bill.id} hover role="checkbox" tabIndex={-1}>
                  <TableCell align="left" style={{ paddingLeft: "2%" }}>
                    {bill.id}
                  </TableCell>
                  <TableCell align="left">
                    {bill.serviceDetail.service.name}
                  </TableCell>
                  <TableCell align="left">{bill.serviceDetail.name}</TableCell>
                  <TableCell align="left">{bill.dateImplement}</TableCell>
                  <TableCell align="left">
                    {bill.timeStart}-{bill.timeEnd}
                  </TableCell>
                  <TableCell align="left">{bill.customer.name}</TableCell>
                  <TableCell align="left">
                    {bill.employee ? (
                      bill.employee.name
                    ) : (
                      <Button
                        style={{
                          border: "1px solid #1976d2",
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() =>
                          assignEmployee(
                            bill.serviceDetail.service.id,
                            bill.id,
                            bill.dateImplement
                          )
                        }
                      >
                        Tìm
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="left">{bill.customer.phone}</TableCell>
                  <TableCell align="left">{bill.payment}</TableCell>
                  <TableCell align="left">
                    {bill.serviceDetail.price.toLocaleString()} VND
                  </TableCell>

                  <TableCell align="left">{bill.billStatus}</TableCell>
                  <TableCell align="left">
                    {bill.billStatus === "STAFF_RECEIVED" &&
                      bill.payment !== "PAYPAL" && (
                        <Button
                          onClick={() => moneyConfirm(bill.id)}
                          style={{
                            fontSize: "12px",
                            border: "1px solid #1976d2",
                            textAlign: "center",
                          }}
                        >
                          Xác nhận nhận tiền từ nhân viên
                        </Button>
                      )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang"
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          classes={{
            selectLabel: "custom-select-label",
            displayedRows: "custom-displayed-rows",
          }}
        />
      </Paper>
      <EditOrderForm serviceId={serviceId} billId={billId} dateImp={dateImp} />
    </>
  );
};

export default OrderService;

export async function orderLoader() {
  const token = sessionStorage.getItem("jwtToken");
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "admin/bills", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("error");
  } else {
    const data = await res.json();
    return data;
  }
}

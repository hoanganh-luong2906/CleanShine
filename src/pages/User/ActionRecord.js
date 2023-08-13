import React from "react";
import "./ActionRecord.css";
import {
  Breadcrumbs,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const ActionRecord = () => {
  const nav = useNavigate();
  const data = useLoaderData();
  const column = [
    { id: "type", label: "Loại", minWidth: 170 },
    { id: "detail", label: "Chi tiết", minWidth: 170 },
    { id: "date", label: "Ngày đặt", minWidth: 170 },
    { id: "date", label: "Ngày thực hiện", minWidth: 170 },
    { id: "date", label: "Thời gian", minWidth: 170 },
    { id: "staff", label: "Nhân viên", minWidth: 170 },
    { id: "transaction", label: "Giao dịch", minWidth: 170 },
    { id: "total", label: "Tổng cộng", minWidth: 170 },
    { id: "total", label: "", minWidth: 170 },
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const cancelBill = async (id) => {
    let idRq = {
      id: id,
    };
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "customer/cancel-bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(idRq),
    });

    if (res.ok) {
      Swal.fire({
        title: "Hủy đơn thành công",
        icon: "success",
        confirmButtonText: "Close",
      });
      nav("");
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <Typography color="text.primary">Đơn hàng</Typography>
      </Breadcrumbs>
      <Paper
        className="container"
        sx={{
          marginTop: 3,
          overflow: "hidden",
          justifyContent: "center",
          display: "flex-end",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <div className="col-md-12 ar-list p-0 table-responsive table-wrapper-scroll-y w-100  my-custom-scrollbar">
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
                {data.map((row) => (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell align="left">
                      {row.serviceDetail.service.name}
                    </TableCell>
                    <TableCell align="left">{row.serviceDetail.name}</TableCell>
                    <TableCell align="left">{row.dateOrder}</TableCell>
                    <TableCell align="left">{row.dateImplement}</TableCell>
                    <TableCell align="left">
                      {row.timeStart} - {row.timeEnd}
                    </TableCell>
                    <TableCell align="left">
                      {row.employee ? row.employee.name : "Đang xử lý"}
                    </TableCell>
                    <TableCell align="left">{row.payment}</TableCell>
                    <TableCell align="left">
                      {row.serviceDetail.price.toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell align="left">
                      {row.billStatus === "CUSTOMER_UNPAID" && (
                        <Button
                          onClick={() => cancelBill(row.id)}
                          style={{
                            fontSize: "12px",
                            border: "1px solid red",
                            textAlign: "center",
                            color: "red",
                          }}
                        >
                          Hủy
                        </Button>
                      )}
                      {row.billStatus === "CUSTOMER_DENY" && "ĐÃ HỦY"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
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
    </>
  );
};

export default ActionRecord;

export async function billLoader() {
  const token = sessionStorage.getItem("jwtToken");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const request = {
    id: user.id,
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "customer/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    throw new Error("error");
  } else {
    const data = await res.json();
    return data;
  }
}

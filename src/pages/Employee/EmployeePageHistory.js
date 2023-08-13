import React from "react";
import { useLoaderData } from "react-router-dom";
import Title from "../../components/Title";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
const EmployeePage = () => {
  const data = useLoaderData();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const column = [
    { id: "job", label: "Công việc", minWidth: 170 },
    { id: "type", label: "Loại", minWidth: 170 },
    { id: "time", label: "Thời gian", minWidth: 170 },
    { id: "date", label: "Ngày", minWidth: 170 },
    { id: "phone", label: "Số điện thoại", minWidth: 170 },
    { id: "total", label: "Tổng cộng", minWidth: 170 },
  ];
  return (
    <>
      <Title
        title="Lịch sử"
        color="#397F77"
        fontSize="35px"
        fontWeight="700"
        padding="4% 0 0 0"
      />
      <div className="row mt-3">
        <div className="col-md-12">
          <Paper
            className="container"
            sx={{
              marginTop: 1,
              overflow: "hidden",
              justifyContent: "center",
              display: "flex-end",
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
                {data.map((bill) => (
                  <TableRow
                    key={Math.random()}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell align="left">
                      {bill.serviceDetail.service.name}
                    </TableCell>
                    <TableCell align="left">
                      {bill.serviceDetail.name}
                    </TableCell>
                    <TableCell align="left">
                      {bill.timeStart} - {bill.timeEnd}
                    </TableCell>
                    <TableCell align="left">{bill.dateImplement}</TableCell>
                    <TableCell align="left">{bill.customer.phone}</TableCell>
                    <TableCell align="left">
                      {bill.serviceDetail.price.toLocaleString()} VNĐ
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
        </div>
      </div>
    </>
  );
};

export default EmployeePage;
export async function employeeHistoryLoader() {
  const token = sessionStorage.getItem("jwtToken");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const request = {
    id: user.id,
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "employee/history", {
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

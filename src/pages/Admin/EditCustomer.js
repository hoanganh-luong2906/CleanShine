import React, { useEffect, useState } from "react";
import "./EditCus.css";
import Title from "../../components/Title";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
const EditCustomer = () => {
  const data = useLoaderData();
  const nav = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const location = useLocation();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const column = [
    { id: "no", label: "STT", minWidth: 170 },
    { id: "name", label: "Họ tên", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "block", label: "Tòa", minWidth: 170 },
    { id: "room", label: "Mã căn", minWidth: 170 },
    { id: "phone", label: "Số điện thoại", minWidth: 170 },
    { id: "delete", label: "Xóa", minWidth: 170 },
  ];
  const [departs, setDeparts] = useState([]);
  const [selectedToa, setSelectedToa] = useState(data);
  const deleteCustomer = async (idReq) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem("jwtToken");
    const id = {
      id: idReq,
    };
    const res = await fetch(apiUrl + "admin/customers", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    });
    nav(location.pathname);
  };
  useEffect(() => {
    const departmentLoader = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(apiUrl + "departments");
      const data = await res.json();
      const DEPARTMENT = data.map((e) => ({
        value: e.departmentName,
        label: e.departmentName,
      }));
      setDeparts(DEPARTMENT);
    };

    departmentLoader();
  }, []);
  const departmentHandler = (event) => {
    const selectedDepartment = event.target.value;
    const ARRAY = data.filter(
      (customer) => customer.buildingNumber === selectedDepartment
    );
    setSelectedToa(ARRAY);
  };
  return (
    <>
      <Typography variant="h5" sx={{color: "#397F77", textAlign: "center", fontFamily: "Work Sans", fontWeight: "bold"}}>KHÁCH HÀNG</Typography>
      <Box className="col-10">
        <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
          <InputLabel id="demo-simple-select-label">Khu vực</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={departmentHandler}
            displayEmpty
            required
          >
            {departs.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Paper
        className="container"
        sx={{
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
            {selectedToa.map((customer) => (
              <TableRow key={customer.id} hover role="checkbox" tabIndex={-1}>
                <TableCell align="left">{customer.id}</TableCell>
                <TableCell align="left">{customer.name}</TableCell>
                <TableCell align="left">{customer.email}</TableCell>
                <TableCell align="left">{customer.buildingNumber}</TableCell>
                <TableCell align="left">{customer.roomNumber}</TableCell>
                <TableCell align="left">{customer.phone}</TableCell>
                <TableCell align="left" style={{ padding: 0 }}>
                  <div className="col-md-12 offset-md-2">
                    <img
                      src="/assets/images/trash.svg"
                      alt="Trash"
                      style={{
                        width: "25%",
                        justifyContent: "space-around",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    />
                  </div>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Xoá khách hàng
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Bạn có chắc chắn muốn xóa? Không thể hoàn tác sau khi
                          thực hiện thao tác này.
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
                            onClick={() => deleteCustomer(customer.id)}
                          >
                            Đồng ý
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
    </>
  );
};

export default EditCustomer;
export async function customerLoader() {
  const token = sessionStorage.getItem("jwtToken");
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "admin/customers", {
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

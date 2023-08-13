import React, { useState } from "react";
import "./EditCus.css";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import EditEmployeeForm from "../../components/Admin/EditEmployeeForm";
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm";
import {
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

const EditEmployee = () => {
  const nav = useNavigate();
  const location = useLocation();
  const data = useLoaderData();
  const [employee, setEmployee] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const deleteEmployee = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem("jwtToken");
    const id = {
      id: employee.employeeInfo.id,
    };
    const res = await fetch(apiUrl + "admin/employees", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    });
    if (res.ok) {
      Swal.fire({
        title: "Xóa nhân viên thành công",
        icon: "success",
        confirmButtonText: "Close",
      });
    }
    nav(location.pathname);
  };

  const editEmployeeHandler = (employee) => {
    setEmployee(employee);
  };

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
    { id: "phone", label: "Số điện thoại", minWidth: 170 },
    { id: "job", label: "Công việc", minWidth: 170 },
    { id: "edit", label: "Chỉnh sửa", minWidth: 170 },
    { id: "delete", label: "Xóa", minWidth: 170 },
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
        NHÂN VIÊN
      </Typography>
      <div className="row">
        <div className="col-12">
          <img
            src="/assets/images/add-person.svg"
            alt=""
            style={{ width: "3.5%", marginRight: "30px" }}
            data-bs-toggle="modal"
            data-bs-target="#AddModal"
          />
          <AddEmployeeForm />
          <Paper
            className="container"
            sx={{
              marginTop: 1,
              width: "100%",
              overflow: "hidden",
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
                {data.map((employee) => (
                  <TableRow
                    key={employee.id}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell align="left">{employee.id}</TableCell>
                    <TableCell align="left">
                      {employee.employeeInfo.name}
                    </TableCell>
                    <TableCell align="left">
                      {employee.employeeInfo.email}
                    </TableCell>
                    <TableCell align="left">
                      {employee.employeeInfo.phone}
                    </TableCell>
                    <TableCell align="left">{employee.service.name}</TableCell>
                    <TableCell align="left">
                      <div className="col-md-12 offset-md-3">
                        <img
                          src="/assets/images/pencil.svg"
                          alt="Pencil"
                          style={{ width: "20%" }}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => editEmployeeHandler(employee)}
                        />
                      </div>
                    </TableCell>
                    <TableCell align="left" style={{ padding: 0 }}>
                      <div className="col-md-12 offset-md-3">
                        <img
                          src="/assets/images/trash.svg"
                          alt="Trash"
                          style={{
                            width: "25%",
                            justifyContent: "space-around",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => setEmployee(employee)}
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
                                Xoá nhân viên
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              Bạn có chắc chắn muốn xóa? Không thể hoàn tác sau
                              khi thực hiện thao tác này.
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
                                data-bs-dismiss="modal"
                                className="btn btn-primary"
                                onClick={deleteEmployee}
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
        </div>
      </div>
      <EditEmployeeForm employee={employee} />
    </>
  );
};

export default EditEmployee;

export async function employeeLoader() {
  const token = sessionStorage.getItem("jwtToken");
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "admin/employees", {
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

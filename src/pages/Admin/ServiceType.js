import {
  Breadcrumbs,
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
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddServiceTypeForm from "../../components/Admin/AddServiceTypeForm";
import EditServiceTypeForm from "../../components/Admin/EditServiceTypeForm";

const ServiceType = () => {
  const data = useLoaderData();
  const nav = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [serviceType, setService] = useState([]);

  const handleServiceChange = (service) => {
    setService(service);
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
    { id: "name", label: "Dịch vụ", minWidth: 170 },
    { id: "detail", label: "Loại", minWidth: 170 },
    { id: "price", label: "Giá", minWidth: 170 },
    { id: "type", label: "Trạng thái", minWidth: 170 },
    { id: "edit", label: "Chỉnh sửa", minWidth: 170 },
    { id: "unable", label: "Action", minWidth: 170 },
  ];
  const handleOffChange = async (service) => {
    let id = {
      id: service.id,
    };
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/disable-service-detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
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
    nav("/admin/service-detail");
  };
  const handleOnChange = async (service) => {
    let id = {
      id: service.id,
    };
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/enable-service-detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
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
    nav("/admin/service-detail");
  };
  return (
    <>
      <Typography variant="h5" sx={{color: "#397F77", textAlign: "center", fontFamily: "Work Sans", fontWeight: "bold"}}>CHI TIẾT DỊCH VỤ</Typography>
      <AddServiceTypeForm />
      <Paper
        className="container"
        sx={{
          overflow: "hidden",
          justifyContent: "center",
          display: "flex-end",
          margin: "10px 0 5vh 0",
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
              .map((service) => (
                <TableRow key={service.id} hover role="checkbox" tabIndex={-1}>
                  <TableCell align="left">{service.id}</TableCell>
                  <TableCell align="left">{service.service.name}</TableCell>
                  <TableCell align="left">{service.name}</TableCell>
                  <TableCell align="left">{service.price.toLocaleString()} VNĐ </TableCell>
                  <TableCell align="left">
                    {service.status ? "ON" : "OFF"}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ padding: 0 }}
                    onClick={() => handleServiceChange(service)}
                  >
                    <EditServiceTypeForm serviceType={serviceType} />
                  </TableCell>
                  <TableCell align="left">
                    {service.status ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOffChange(service)}
                      >
                        Tắt
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleOnChange(service)}
                      >
                        Bật
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
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

export default ServiceType;
export async function serviceDetailLoader() {
  const token = sessionStorage.getItem("jwtToken");
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "admin/service-details", {
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

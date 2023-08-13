import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const OddShiftTable = (props) => {
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OddShiftTable;

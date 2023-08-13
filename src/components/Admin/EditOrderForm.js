import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditOrderForm = (props) => {
  const [data, setData] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    if (props.dateImp !== "" && props.serviceId !== "") {
      const fetchData = async () => {
        const token = sessionStorage.getItem("jwtToken");
        const DATA = {
          serviceId: props.serviceId,
          dateImplement: props.dateImp,
        };
        const apiUrl = process.env.REACT_APP_API_URL;
        const res = await fetch(apiUrl + "admin/employees-by-service", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(DATA),
        });

        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const responseData = await res.json();
        setData(responseData);
      };
      fetchData();
    }
  }, [props.billId]);

  const handleChooseEmployee = (id) => {
    setEmployeeId(id);
  };

  const assignEmployeeHandler = async () => {
    let newOrder = {
      billId: props.billId,
      employeeId: employeeId,
    };
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(apiUrl + "admin/assign-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newOrder),
    });
    if (res.ok && employeeId !== "") {
      Swal.fire({
        title: "Đăng ký nhân viên thành công",
        icon: "success",
        confirmButtonText: "Close",
      });
    }
    setEmployeeId("");
    nav("/admin/order-service");
  };
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ width: "150%", transform: "translate(-16%, 0)" }}
          >
            <div className="modal-header">
              <h1 className="modal-title" id="staticBackdropLabel">
                Danh sách nhân viên
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Công việc</th>
                    <th scope="col">SDT</th>
                    <th scope="col">Chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((employee) => (
                    <tr key={employee.employeeInfo.id}>
                      <td>{employee.employeeInfo.name}</td>
                      <td>{employee.employeeInfo.email}</td>
                      <td>{employee.service.name}</td>
                      <td>{employee.employeeInfo.phone}</td>
                      <td className="d-flex justify-content-center align-items-center">
                        <input
                          type="checkbox"
                          id={employee.id}
                          value={employee.id}
                          checked={employeeId === employee.employeeInfo.id}
                          onChange={() =>
                            handleChooseEmployee(employee.employeeInfo.id)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Huỷ
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={assignEmployeeHandler}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrderForm;

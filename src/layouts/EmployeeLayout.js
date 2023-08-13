import React from "react";
import { Outlet } from "react-router-dom";
import EmployeeNavigation from "../components/Employee/EmployeeNavigation";
import Overlays from "./Overlays";

const EmployeeLayout = () => {
  return (
    <Overlays>
      <div className="row">
        <div className="col-lg-2 col-md-12">
          <EmployeeNavigation />
        </div>
        <div className="col-lg-10 col-md-12">
          <Outlet />
        </div>
      </div>
    </Overlays>
  );
};

export default EmployeeLayout;

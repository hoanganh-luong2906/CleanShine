import React from "react";
import UserHeader from "../components/User/UserHeader";
import { Outlet } from "react-router-dom";
import Overlays from "./Overlays";

const UserPageLayout = () => {
  return (
    <Overlays>
      <marquee>
        <span style={{ color: "rgb(57, 127, 119)" }}>
          Khám phá và trải nghiệm các dịch vụ gia đình ngay hôm nay.
        </span>
      </marquee>
      <div className="row">
        <div className="col-lg-2 col-md-12" style={{ padding: 0 }}>
          <UserHeader />
        </div>
        <div className="col-md-10 offset-md-2">
          <Outlet />
        </div>
      </div>
    </Overlays>
  );
};

export default UserPageLayout;

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Typography } from "@mui/material";

const HeadingBar = () => {
  return (
    <nav
      className="custom-navbar navbar navbar navbar-expand-md my-3"
      arial-label="CleanShine navigation bar"
    >
      <div className="container-fluid">
        {/* LOGO */}
        <NavLink className="navbar-brand" to="/">
          <img src="/assets/images/LOGO.svg" alt="" />
        </NavLink>

        {/* NAVIGATION BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsCleanShine"
          aria-controls="navbarsCleanShine"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVIGATION BAR */}
        <div className="collapse navbar-collapse" id="navbarsCleanShine">
          <ul
            className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0 service-list"
            id="nav-link"
          >
            <li>
              <NavLink
                style={{
                  fontWeight: "700",
                }}
                className={({ isActive }) =>
                  isActive
                    ? "nav-link otp-service active"
                    : "nav-link otp-service"
                }
                to=""
                end
              >
                TRANG CHỦ
              </NavLink>
            </li>
            <li className="nav-item">
              <div className="opt-services">
                <Link
                  className="nav-link btn btn-secondary dropdown-btn"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ position: "relative", fontWeight: "700" }}
                >
                  DỊCH VỤ
                  <div className="arrow"></div>
                </Link>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="hourly-help">
                      Giúp việc theo giờ
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="total-senitation">
                      Tổng vệ sinh
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="electronic-cleaning">
                      Vệ sinh điều hòa
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="fabric-cleaning">
                      Vệ sinh sofa
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <NavLink
                style={{
                  fontWeight: "700",
                }}
                className={({ isActive }) =>
                  isActive
                    ? "nav-link otp-service active"
                    : "nav-link otp-service"
                }
                to="contact"
                end
              >
                LIÊN HỆ
              </NavLink>
            </li>
            <li>
              <NavLink
                style={{
                  fontWeight: "700",
                }}
                className={({ isActive }) =>
                  isActive
                    ? "nav-link otp-service active"
                    : "nav-link otp-service"
                }
                to="news"
                end
              >
                TIN TỨC
              </NavLink>
            </li>
            <li>
              <NavLink
                style={{
                  fontWeight: "700",
                }}
                className={({ isActive }) =>
                  isActive
                    ? "nav-link otp-service active"
                    : "nav-link otp-service"
                }
                to="guarantee"
                end
              >
                CHÍNH SÁCH BẢO HÀNH
              </NavLink>
            </li>
            <NavLink
              to="sign-in"
              style={{
                textDecoration: "none",
                marginLeft: "5%",
                marginTop: "0.3%",
              }}
            >
              <Typography
                sx={{
                  color: "#397f77",
                  letterSpacing: "0.05rem",
                  display: "inline",
                  fontWeight: "lighter",
                  fontSize: "20px",
                }}
                component="span"
              >
                Đăng nhập
              </Typography>
            </NavLink>
            <div
              class="navbar__link-separator"
              style={{
                borderRight: "1px solid black",
                height: "1rem",
                marginLeft: 8,
                marginTop: 10,
              }}
            />
            <NavLink
              to="sign-up"
              href="#"
              style={{
                textDecoration: "none",
                marginLeft: 9,
                marginTop: "0.3%",
              }}
            >
              <Typography
                sx={{
                  color: "gray",
                  letterSpacing: "0.05rem",
                  display: "inline",
                  fontWeight: "lighter",
                  fontSize: "20px",
                }}
                component="span"
              >
                Đăng ký
              </Typography>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeadingBar;

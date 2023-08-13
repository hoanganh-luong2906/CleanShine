import * as React from "react";
import { styled } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import useLogout from "../../hooks/useLogout";
import ReplayIcon from "@mui/icons-material/Replay";
import "./AdminNavigation.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminNavigation() {
  const [open, setOpen] = useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState("");
  const [displaySubmenu, setDisplaySubmenu] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [selectedLink, setSelectedLink] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");

  const handleActiveClick = (selectedService, subItems, link) => {
    setSelectedService(selectedService);
    setSelectedLink(link);
    setActiveMenuItem(selectedService);
    setDisplaySubmenu(!displaySubmenu);
    navigate(link);
  };

  const handleNavigateClick = (selectedSubItem) => {
    const link = `${selectedLink}/${encodeURIComponent(selectedSubItem)}`;
    setSelectedPath(link);
    setSelectedSubItem(selectedSubItem);
    navigate(link);
  };

  const menuItems = [
    {
      text: "Thống kê",
      icon: "/assets/images/bar-chart.svg",
    },
    {
      text: "Khách hàng",
      icon: "/assets/images/customers.svg",
      onClick: handleActiveClick,
      link: "edit-customer",
    },
    {
      text: "Nhân viên",
      icon: "/assets/images/person.svg",
      link: "edit-employee",
    },
    {
      text: "Dịch vụ",
      icon: "/assets/images/services.svg",
      link: "edit-service",
    },
    {
      text: "Chi tiết dịch vụ",
      icon: "/assets/images/services.svg",
      link: "service-detail",
    },
  ];

  const { logout } = useLogout();

  const logoutHandler = async () => {
    await logout();
  };

  const icon = [
    {
      text: "Đơn hàng",
      icon: "/assets/images/clipboard-data.svg",
      link: "order-service",
    },
    {
      text: "Đăng xuất",
      icon: "/assets/images/box-arrow-right.svg",
      onClick: logoutHandler,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#ffffff00", boxShadow: "none", border: "none" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
          >
            <MenuIcon sx={{ color: "gray" }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "black",
              letterSpacing: "0.05rem",
              fontFamily: "Montserrat",
              fontSize: "22px",
            }}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          backgroundColor: "#ffffff00",
          "& .MuiDrawer-paper": { backgroundColor: "#ffffff00" },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}></IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map(({ text, icon, link, subItems, onClick }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleActiveClick(text, subItems, link)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "flex-start" : "center",
                  px: 2.5,
                  fontFamily: "Montserrat",
                  fontSize: "15px",
                }}
              >
                <img
                  className="nav-icon"
                  src={icon}
                  alt="icon"
                  style={{
                    width: "22px",
                    height: "22px",
                    marginRight: open ? "16px" : "0",
                    display: "inline-block",
                  }}
                />
                {open && (
                  <NavLink className="nav-link" to={link}>
                    {text}
                  </NavLink>
                )}
              </ListItemButton>

              {subItems && (
                <Collapse
                  in={open && activeMenuItem === text && displaySubmenu}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {subItems.map(({ text: subText }) => (
                      <ListItemButton
                        key={subText}
                        component={NavLink}
                        onClick={() => handleNavigateClick(subText)}
                        to="#"
                        sx={{
                          pl: 8,
                          "&:hover": {
                            color: "#000000DE",
                          },
                          color:
                            activeMenuItem === text &&
                            subText === selectedSubItem
                              ? "#397F77"
                              : "inherit",
                        }}
                      >
                        <ListItemText primary={subText} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {icon.map(({ text, icon, link, subItems, onClick }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() =>
                  onClick ? onClick() : handleActiveClick(text, subItems, link)
                }
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "flex-start" : "center",
                  px: 2.5,
                  fontFamily: "Montserrat",
                  fontSize: "15px",
                }}
              >
                <img
                  className="nav-icon"
                  src={icon}
                  alt="icon"
                  style={{
                    width: "22px",
                    height: "22px",
                    marginRight: open ? "16px" : "0",
                    display: "inline-block",
                  }}
                />
                {open && (
                  <NavLink className="nav-link" to={link}>
                    {text}
                  </NavLink>
                )}
              </ListItemButton>
              {subItems && (
                <Collapse
                  in={open && activeMenuItem === text && displaySubmenu}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {subItems.map(({ text: subText }) => (
                      <ListItemButton
                        key={subText}
                        component={NavLink}
                        onClick={() => handleNavigateClick(subText)}
                        to="#"
                        sx={{
                          pl: 8,
                          "&:hover": {
                            color: "#397F77",
                          },
                          color:
                            selectedSubItem === subText
                              ? "#397F77" // Change color when the subText is the selectedSubItem
                              : "inherit",
                        }}
                      >
                        <ListItemText primary={subText} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
    </Box>
  );
}

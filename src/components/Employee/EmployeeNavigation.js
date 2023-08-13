import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { NavLink, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Typography,
  Box,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Toolbar,
  CssBaseline,
  Divider,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import { List, ListItemButton, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
  backgroundColor: "#fff0",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
    backgroundColor: "#fff0",
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
    backgroundColor: "#fff0",
  }),
}));

export default function EmployeeNavigation() {
  const [open, setOpen] = useState(true);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const [displayItem, setDisplayItem] = useState("");
  const [selectedPath, setSelectedPath] = useState("");
  const [displaySubmenu, setDisplaySubmenu] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const handleActiveClick = (text, link) => {
    setSelectedPath(link);
    setDisplayItem(text);
    setActiveMenuItem(text);
    setDisplaySubmenu(!displaySubmenu);
    navigate(link);
  };

  const menuItems = [
    {
      text: "Đơn được giao",
      icon: "/assets/images/house.svg",
    },
    {
      text: "Đơn đã nhận",
      icon: "/assets/images/house.svg",
      link: "accepted-orders",
    },
    {
      text: "Lịch sử",
      icon: "/assets/images/history.svg",
      link: "history-emp",
    },
  ];
  const { logout } = useLogout(); // Call the useLogout hook

  const logoutHandler = async () => {
    await logout(); // Call the logout function from the useLogout hook
  };
  const icon = [
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
            Hi, {user.name}
          </Typography>
          <Tooltip>
            <Avatar
              alt="User Image"
              src="/assets/images/avatar2.jpg"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{ marginLeft: "auto" }}
            />
          </Tooltip>
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
          {menuItems.map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleActiveClick(text, link)}
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
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {icon.map(({ text, icon, link, onClick }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() =>
                  onClick ? onClick() : handleActiveClick(text, link)
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
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
    </Box>
  );
}

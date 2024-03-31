import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import useMediaQuery from "@mui/material/useMediaQuery";

import { useUserContext } from "../../hooks/UserContext";
import LoadingPage from "../LoadingPage";
import { LOGIN_STATUS_ROUTE } from "../../constants";
import LoginPage from "../LoginPage";
import { useTheme } from "@emotion/react";

import logo from "../../assets/images/logo.png";
import {
  ExitToApp,
  HomeOutlined,
  HomeRounded,
  MenuRounded,
  NotificationsOutlined,
  NotificationsRounded,
  Person,
  PersonOutline,
} from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

const navList = [
  {
    icon: HomeOutlined,
    hoverIcon: HomeRounded,
    color: "blue",
    link: "/",
    label: "Home",
  },
  {
    icon: PersonOutline,
    hoverIcon: Person,
    color: "blue",
    link: "/profile",
    label: "Profile",
  },
];

const Notifications = () => {
  const toggleNotifications = () => {};

  return (
    <div>
      <IconButton onClick={toggleNotifications}>
        <NotificationsOutlined />
      </IconButton>
    </div>
  );
};

const NavMenuElement = ({ item }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const pathname = window.location.pathname;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: "pointer",
        backgroundColor: isHovered ? "lightgray" : "white",
        display: "flex",
        alignItems: "center",
        fontSize: "0.8rem",
        minWidth: "5rem",
        padding: "5px 5px 5px 10px",
      }}
      onClick={() => navigate(item.link)}
    >
      {pathname === item.link ? (
        <item.hoverIcon style={{ color: "#387ADF", fontSize: "1.1rem" }} />
      ) : isHovered ? (
        <item.hoverIcon style={{ color: "#50C4ED", fontSize: "1.1rem" }} />
      ) : (
        <item.icon style={{ color: "#50C4ED", fontSize: "1.1rem" }} />
      )}
      &nbsp;
      {item.label}
    </div>
  );
};

const NavElement = ({ item }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const pathname = window.location.pathname;

  return (
    <Tooltip title={item.label} placement="right">
      <IconButton
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(item.link)}
      >
        {pathname === item.link ? (
          <item.hoverIcon style={{ color: "#387ADF" }} />
        ) : isHovered ? (
          <item.hoverIcon style={{ color: "#50C4ED" }} />
        ) : (
          <item.icon style={{ color: "#50C4ED" }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuRounded />
      </IconButton>

      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {navList.map((el, index) => (
          <NavMenuElement item={el} key={"nav-item-" + index} handleClose={handleClose} />
        ))}
      </Menu>
    </div>
  );
};

const Wrapper = () => {
  const navigate = useNavigate();

  const { user, loading, updateUser, logout } = useUserContext();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const getLoginStatus = () => {
    axios
      .get(LOGIN_STATUS_ROUTE, { withCredentials: true })
      .then((res) => {
        console.log({ res });
        updateUser(res.data);
      })
      .catch((err) => {
        console.log({ err });

        updateUser(null);
      });
  };

  useEffect(() => {
    getLoginStatus();
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingPage width="100px" height="100px" />
      </div>
    );

  if (!user) return <LoginPage />;

  if (isMd)
    return (
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <nav
          style={{
            height: "100vh",
            width: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ height: "2rem", padding: "10px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Zui Logo" style={{ height: "100%" }} />
          </div>

          <div style={{ marginTop: "2rem", flex: 1 }}>
            {navList.map((el, index) => (
              <NavElement item={el} key={"nav-item-" + index} />
            ))}
          </div>

          <Notifications />

          <IconButton onClick={logout}>
            <ExitToApp color="warning" />
          </IconButton>
        </nav>

        <div
          style={{ overflow: "auto", boxSizing: "border-box", padding: "2rem", flex: 1 }}
        >
          <Outlet />
        </div>
      </div>
    );

  return (
    <div style={{ dispaly: "flex", flexDirection: "column", height: "100vh" }}>
      <nav
        style={{
          height: "4rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ height: "2rem", padding: "10px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Zui Logo" style={{ height: "100%" }} />
        </div>

        <NavMenu />

        {/* <div style={{ marginTop: "2rem", flex: 1 }}>
          {navList.map((el, index) => (
            <NavElement item={el} key={"nav-item-" + index} />
          ))} */}
        {/* </div> */}
      </nav>
      <div
        style={{
          height: "calc(100vh - 4rem)",
          overflow: "auto",
          boxSizing: "border-box",
          padding: "2rem",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Wrapper;

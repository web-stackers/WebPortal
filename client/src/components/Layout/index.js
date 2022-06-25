import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material//Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedIn from "@mui/icons-material/AssignmentTurnedIn";
import { Buffer } from "buffer";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import decode from "jwt-decode";
import { useLocation, useNavigate, Outlet, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import {
  DashboardOutlined,
  PeopleAltOutlined,
  WorkOutline,
  FeedbackOutlined,
} from "@mui/icons-material";

import useStyles from "./styles";

const Layout = ({ user, setUser }) => {
  const defaultProfilePic = require("../../assets/proPic.jpg");
  const appLogo = require("../../assets/logo.png");
  let base64String = false;
  const mimetype = user?.result?.profilePicture?.contentType;
  const buffer = user?.result?.profilePicture?.data;
  base64String = Buffer.from(buffer).toString("base64");
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let menuItems;
  if (user?.result?.role === "Admin") {
    menuItems = [
      {
        text: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardOutlined />,
      },
      {
        text: "Users",
        path: "/admin/users",
        icon: <PeopleAltOutlined />,
      },
      {
        text: "Third Party",
        path: "/admin/thirdParty",
        icon: <PeopleAltOutlined />,
      },
      {
        text: "Jobs",
        path: "/admin/jobs",
        icon: <WorkOutline />,
      },
      {
        text: "Complaints",
        path: "/admin/complaints",
        icon: <FeedbackOutlined />,
      },

      {
        text: "Withdrawals",
        path: "/admin/withdrawals",
        icon: <FeedbackOutlined />,
      },
    ];
  }
  if (user?.result?.role === "Third Party") {
    menuItems = [
      {
        text: "New Providers",
        path: "/thirdParty/new",
        icon: <AssignmentIcon />,
      },
      {
        text: "Verified Providers",
        path: "/thirdParty/verified",
        icon: <AssignmentTurnedIn />,
      },
    ];
  }

  const logout = () => {
    localStorage.clear();
    // dispatch({ type: actionType.LOGOUT });

    // history.push('/auth');

    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(() => {
      return JSON.parse(localStorage.getItem("profile"));
    });
  }, [location]);

  return (
    <div className={classes.root}>
      {/* Appbar */}
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.pageTitle}>
            {user?.result?.role === "Admin"
              ? "Admin Panel"
              : "Third Party Panel"}
          </Typography>
          {/* <Typography>{user?.result?.name?.fName}</Typography> */}
          {user?.result?.role === "Admin" ? (
            <React.Fragment>
              <Button
                aria-describedby={id}
                // variant="contained"
                color="tertiary"
                onClick={handleClick}
              >
                {user?.result?.name?.fName}
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
                <Button
                  sx={{ p: 1 }}
                  variant="contained"
                  color="primary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </Popover>

              <Avatar
                className={classes.avatar}
                src={
                  base64String
                    ? `data:${mimetype};base64,${base64String}`
                    : defaultProfilePic
                }
              />
            </React.Fragment>
          ) : null}

          {user?.result?.role === "Third Party" ? (
            <React.Fragment>
              <Typography color="tertiary">
                {user?.result?.name?.fName}
              </Typography>
              <Tooltip title="Account settings">
                <IconButton
                  className={classes.button}
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2, width: 35, height: 35 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    className={classes.avatar}
                    sx={{ width: 40, height: 40, mr: 2 }}
                    src={
                      base64String
                        ? `data:${mimetype};base64,${base64String}`
                        : defaultProfilePic
                    }
                  />
                </IconButton>
              </Tooltip>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Paper>
                    <MenuList>
                      <MenuItem>
                        <Link to="/thirdParty/thirdPartyPanelProfile">
                          <Button>Profile</Button>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/thirdParty/sendMail">
                          <Button>Help</Button>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Button sx={{ p: 1 }} onClick={logout}>
                          Logout
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </Stack>
              </Popover>
            </React.Fragment>
          ) : null}
        </Toolbar>
      </AppBar>

      {/* Side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.title}>
          <img
            // className={classes.userImage}
            style={{
              width: "50%",
              marginLeft: "25%",
              marginRight: "25%",
              marginTop: "15px",
            }}
            src={appLogo}
            alt=""
          />
          {/* <Typography variant="h5">Helper</Typography> */}
        </div>

        {/* Menu List */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              className={
                location.pathname.startsWith(item.path) ? classes.active : null
              }
            >
              <ListItemIcon style={{ color: "white" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <div>
          <Typography></Typography>
        </div>
      </Drawer>

      {/* Content */}
      <div className={classes.page}>
        <div className={classes.htoolbar}></div>
        <div className={classes.children}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";


import useStyles from "../styles/styles";

const ThirdPartyLayout = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "New Documents",
      path: "/",
    //   icon: <InsertDriveFileIcon />,
    },
    {
      text: "Verified Documents",
      path: "/verified",
    //   icon: <DescriptionIcon />,
    },
  ];

  return (
    <div className={classes.root}>
      {/* Appbar */}
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.pageTitle}>Welcome !</Typography>
          <Typography>Pavadaran</Typography>
          <Avatar
            className={classes.avatar}
            src={require("../assets/adminPic.jpg")}
          />
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
          <Typography variant="h5">ThirdParty Panel</Typography>
        </div>

        {/* Menu List */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
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
        {children}
      </div>
    </div>
  );
};

export default ThirdPartyLayout;

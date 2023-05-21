import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Box,
  Grid,
  SwipeableDrawer,
  Button,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";

const styleSheet = {
  list: {
    width: 200,
  },
  padding: {
    paddingRight: 30,
    cursor: "pointer",
  },
  sideBarIcon: {
    padding: 0,
    color: "white",
    cursor: "pointer",
  },
};

const ResAppBar = ({ classes }) => {
  const [drawerActivate, setDrawerActivate] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const createDrawer = () => {
    return (
      <Box>
        <AppBar color="secondary">
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <MenuIcon
                className={classes.sideBarIcon}
                onClick={() => setDrawer(true)}
              />
              {!drawer && (
                <Typography color="inherit" variant="h6">
                  User Auth
                </Typography>
              )}
              <Typography color="inherit" variant="h6"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={drawer}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
        >
          <Box
            role="presentation"
            onClick={() => setDrawer(false)}
            onKeyDown={() => setDrawer(false)}
            sx={{ backgroundColor: "#9c27b0", height: "100vh" }}
          >
            <Typography
              color="inherit"
              variant="h6"
              sx={{ display: "flex", justifyContent: "center", color: "white" }}
            >
              User Auth
            </Typography>
            <List className={classes.list}>
              <ListItem button divider>
                {" "}
                <Button
                  color="inherit"
                  sx={{ mr: 1, color: "white" }}
                  component={RouterLink}
                  to="/register"
                >
                  Sign Up
                </Button>
              </ListItem>
              <ListItem button divider>
                {" "}
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{ color: "white" }}
                >
                  Login
                </Button>
              </ListItem>
            </List>
          </Box>
        </SwipeableDrawer>
      </Box>
    );
  };

  const destroyDrawer = () => {
    return (
      <AppBar color="secondary">
        {drawer ? (
          ""
        ) : (
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }} color="inherit">
              User Auth
            </Typography>

            <Typography
              variant="subtitle1"
              className={classes.padding}
              color="inherit"
            >
              <Button
                color="inherit"
                sx={{ mr: 1 }}
                component={RouterLink}
                to="/register"
              >
                Sign Up
              </Button>
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.padding}
              color="inherit"
            >
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            </Typography>
          </Toolbar>
        )}
      </AppBar>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setDrawerActivate(true);
      } else {
        setDrawerActivate(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <Box>{drawerActivate ? createDrawer() : destroyDrawer()}</Box>;
};

ResAppBar.propTypes = {
  classes: PropTypes.object,
};
const NavBar = withStyles(styleSheet)(ResAppBar);
export default NavBar;

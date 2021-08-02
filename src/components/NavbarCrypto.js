import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import { useHistory } from "react-router-dom";
import Snackbars from "../components/snackbar";
import useLoading from "../components/hooks/loading-hook";
import useSnackbar from "../components/hooks/snackbar-hook";
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiButton-text": {
      fontSize: "1.2rem",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  root2: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: "100",
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root2}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Navbar = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const [
    handleOpenSnackbar,
    handleCloseSnackbar,
    handleMessage,
    handleSeverity,
    message,
    openSnackbar,
    severity,
  ] = useSnackbar();

  const handlelogout = () => {
    sessionStorage.removeItem("token");
    handleSeverity("success");
    handleMessage("You are now logged out");
    handleOpenSnackbar();
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Snackbars
          open={openSnackbar}
          message={message}
          handleClose={handleCloseSnackbar}
          severity={severity}
        />
        <AppBar position="fixed" style={{ backgroundColor: "black" }}>
          <Toolbar style={{ fontSize: "1.2rem" }}>
            <Typography
              variant="h4"
              style={{ flexGrow: "0.1" }}
              className={classes.title}
            >
              Crypt0
            </Typography>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={() => {
                history.push("/stonks");
              }}
              style={{ cursor: "pointer" }}
            >
              $tonks
            </Typography>
            <Button
              color="inherit"
              onClick={() => history.push("/crypto/crypto_news")}
            >
              News
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/crypto/coins")}
            >
              Coins
            </Button>
            {sessionStorage.getItem("token") === null ? (
              <Button
                color="inherit"
                onClick={() => history.push("/login")}
                style={{
                  background: "white",
                  color: "black",
                  height: "27px",
                }}
              >
                Login
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={handlelogout}
                style={{
                  background: "white",
                  color: "black",
                  height: "27px",
                }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <ScrollTop {...props}>
          <Fab
            style={{ backgroundColor: "#784af4", color: "white" }}
            size="small"
            aria-label="scroll back to top"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </div>
    </React.Fragment>
  );
};

export default Navbar;

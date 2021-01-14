import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { DateRange } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.custom.dark,
    // backgroundColor: theme.palette.common.black,
    flexWrap: "wrap",
  },
  toolbarTitle: {
    color: "white",
    textDecoration: "none",
    flexGrow: 1,
    paddingLeft: "1rem",
  },
  icon: {
    color: "white",
    fontSize: "default",
  },
  link: {
    color: "white",
    fontWeight: 400,
    textDecoration: "none",
    margin: theme.spacing(1, 1.5),
  },
  button: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
}));

const Nav = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar>
          <DateRange className={classes.icon} />
          <Link to="/" className={classes.toolbarTitle}>
            <Typography variant="h5" color="inherit" noWrap>
              TeamWeek
            </Typography>
          </Link>
          <Link to="/login" className={classes.link}>
            LOG IN
          </Link>
          <Link to="/signup" className={classes.link}>
            <Button variant="outlined" className={classes.button}>
              Sign up
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Nav;

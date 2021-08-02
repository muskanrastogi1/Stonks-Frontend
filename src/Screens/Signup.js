import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import auth from "../assets/auth.png";
import Snackbars from "../components/snackbar";
import useLoading from "../components/hooks/loading-hook";
import useSnackbar from "../components/hooks/snackbar-hook";

const useStyles = makeStyles((theme) => ({}));

const Signup = () => {
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    var data = {
      name: name,
      email: email,
      password: password,
    };

    console.log(data);

    var config = {
      method: "post",
      url: "https://stocks-un.herokuapp.com/user/signup",
      headers: {},
      data: data,
    };

    Axios(config)
      .then(function (res) {
        console.log(res.data);
        sessionStorage.setItem("token", res.data.token);
        handleSeverity("success");
        handleMessage("Sign Up Successful.");
        handleOpenSnackbar();
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 409) {
          handleSeverity("error");
          handleMessage("Email already exists");
          handleOpenSnackbar();
        } else {
          handleSeverity("error");
          handleMessage("Something went wrong");
          handleOpenSnackbar();
        }
      });
  };

  return (
    <div style={{ height: "89vh" }}>
      <Snackbars
        open={openSnackbar}
        message={message}
        handleClose={handleCloseSnackbar}
        severity={severity}
      />
      <Grid
        container
        alignItems="center"
        style={{ height: "100%", padding: "20px" }}
      >
        <Grid item xs={6}>
          <img src={auth} width="80%" height="auto" />
        </Grid>

        <Grid item xs={6}>
          <Card
            style={{
              boxShadow: "4px 4px 50px rgba(0, 0, 0, 0.05)",
              borderRadius: "30px",
              textAlign: "center",
              height: "auto",
            }}
          >
            <CardContent>
              <Grid
                container
                spacing={1}
                //   className={classes.gridContainerBox}
                justify="space-between"
              >
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    //   variant="h5"
                    //   component="h2"
                    style={{
                      fontFamily: "Source Sans Pro",
                      // fontSize: "3.2rem",
                      fontWeight: "600",
                    }}
                  >
                    Create an Account
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "20px" }}>
                  <Typography
                    //   variant="body2"
                    color="textSecondary"
                    //   component="p"
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontSize: "1rem",
                    }}
                  >
                    Get started with $tonks. You are just one step away!
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    name="name"
                    variant="outlined"
                    label="Name *"
                    type="text"
                    id="batch-name"
                    // size="small"
                    style={{ width: "300px" }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    name="email"
                    variant="outlined"
                    label="Email *"
                    type="email"
                    id="batch-name"
                    style={{ width: "300px" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    id="batch-name"
                    style={{ width: "300px" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <p style={{ textAlign: "center" }}>
                    Already Have an Account?{" "}
                    <span type="button" style={{ color: "#D4C3BC" }}>
                      <Link to="/login">Sign in</Link>
                    </span>
                  </p>
                </Grid>

                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    style={{
                      fontSize: "1rem",
                      background: "blue",
                      color: "white",
                      borderRadius: "10px",
                    }}
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;

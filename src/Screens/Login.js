import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import { Link, useHistory, Redirect } from "react-router-dom";
import auth from "../assets/auth.png";
import Snackbars from "../components/snackbar";
import useLoading from "../components/hooks/loading-hook";
import useSnackbar from "../components/hooks/snackbar-hook";

const useStyles = makeStyles((theme) => ({}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [
    handleOpenSnackbar,
    handleCloseSnackbar,
    handleMessage,
    handleSeverity,
    message,
    openSnackbar,
    severity,
  ] = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    var data = {
      email: email,
      password: password,
    };

    console.log(data);

    var config = {
      method: "post",
      url: "https://stocks-un.herokuapp.com/user/login",
      headers: {},
      data: data,
    };

    Axios(config)
      .then(function (res) {
        console.log(res.data);
        sessionStorage.setItem("token", res.data.token);
        handleSeverity("success");
        handleMessage("Log In Successful.");
        handleOpenSnackbar();
        props.history.push("/");
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 401) {
          handleSeverity("error");
          handleMessage("Invalid Credentials");
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
          <Card
            style={{
              boxShadow: "4px 4px 50px rgba(0, 0, 0, 0.05)",
              borderRadius: "30px",
              textAlign: "center",
              height: "auto",
            }}
          >
            <CardContent>
              <Grid container spacing={1} justify="space-between">
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontWeight: "600",
                    }}
                  >
                    Create an Account
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "20px" }}>
                  <Typography
                    color="textSecondary"
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
                    Don't Have an Account?{" "}
                    <span type="button" style={{ color: "#D4C3BC" }}>
                      <Link to="/signup">Sign Up</Link>
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
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <img src={auth} width="80%" height="auto" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;

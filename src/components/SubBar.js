import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Paper, Typography, Button, IconButton } from "@material-ui/core";
import SmallLoader from "./smallLoader";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Axios from "axios";
import useSnackbar from "../components/hooks/snackbar-hook";
import Snackbars from "../components/snackbar";
import {
  InfiniteLoader,
  List,
  WindowScroller,
  AutoSizer,
} from "react-virtualized";
import useLoading from "../components/hooks/loading-hook";
import { useHistory } from "react-router-dom";

let ITEM_COUNT = 1000;

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    padding: "5px",
    borderRadius: "0px",
    zIndex: "5",
    "& .MuiTypography-body1": {
      fontSize: "1rem",
    },
    borderRadius: "0 0 100px 100px",
    background: "dimgrey",
    color: "white",
  },
  active: {
    height: "1px",
    background: "#E71D35",
    width: "40px",
    margin: "0px",
  },
  root: {
    "& .MuiSvgIcon-root ": {
      width: "20px",
    },
  },
  root2: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 300,
    margin: "20px auto",
    borderRadius: "30px",
    background: "#0000001c",
    height: "40px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: "initial",
  },
}));

const SubBar = ({ allCompanies, affectedCompanies }) => {
  const classes = useStyles();

  const [loading, setLoad, unsetLoad] = useLoading(true);
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

  const [activeTab, setActiveTab] = useState("All");

  const handleActive = (tab) => {
    setActiveTab(tab);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPost, setFilterPost] = useState(allCompanies);

  const [myTracks, setMyTracks] = useState([]);

  const handleMyTrack = () => {
    handleActive("Tracked");
    setLoad();
    var config = {
      method: "get",
      url: "https://stocks-un.herokuapp.com/stock/user/tracking",
      headers: {
        "auth-token": sessionStorage.getItem("token"),
      },
    };

    Axios(config)
      .then(function (res) {
        console.log(res.data);
        setMyTracks(res.data.tracking);
        unsetLoad();
      })
      .catch(function (error) {
        unsetLoad();
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // console.log(filterPosts)
    setFilterPost([]);
    allCompanies
      .filter((post) => {
        // console.log(post.title.toLowerCase())
        if (post["Company Name"]) {
          return post["Company Name"]
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase());
        }
      })
      .map((post) => {
        setFilterPost((prev) => {
          return [...prev, post];
        });
      });
  };

  const handleTrack = (companyName, symbol) => {
    var data = {
      companyName,
      symbol,
    };

    var config = {
      method: "post",
      url: "https://stocks-un.herokuapp.com/stock/track",
      headers: {
        "auth-token": sessionStorage.getItem("token"),
      },
      data: data,
    };

    console.log(sessionStorage.getItem("token"));

    if (sessionStorage.getItem("token") === null) {
      handleSeverity("error");
      handleMessage("Please Login first!");
      handleOpenSnackbar();
    } else {
      Axios(config)
        .then(function (res) {
          console.log(res.data);
          handleSeverity("success");
          handleMessage("Tracker Added Succesfully !");
          handleOpenSnackbar();
        })
        .catch(function (error) {
          if (error.response.status === 409) {
            handleSeverity("error");
            handleMessage("You are already tracking this company.");
            handleOpenSnackbar();
          }
          console.log(error);
        });
    }
  };

  const handleStopTrack = (companyName, symbol) => {
    var data = {
      companyName,
      symbol,
    };

    var config = {
      method: "post",
      url: "https://stocks-un.herokuapp.com/stock/track/stop",
      headers: {
        "auth-token": sessionStorage.getItem("token"),
      },
      data: data,
    };

    Axios(config)
      .then(function (res) {
        console.log(res.data);

        handleSeverity("success");
        handleMessage("Tracker Removed Succesfully");
        handleOpenSnackbar();
        handleMyTrack();
      })
      .catch(function (error) {
        console.log(error);
        unsetLoad();
        handleSeverity("error");
        handleMessage("Something went wrong");
        handleOpenSnackbar();
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "80%", margin: "0px auto 10px" }}>
        <Snackbars
          open={openSnackbar}
          message={message}
          handleClose={handleCloseSnackbar}
          severity={severity}
        />
        <Paper className={classes.header}>
          <Grid container>
            <Grid
              item
              style={{ margin: "0px 20px", cursor: "pointer" }}
              onClick={() => handleActive("All")}
            >
              <Typography>All Companies</Typography>

              {activeTab === "All" && <hr className={classes.active} />}
            </Grid>
            <Grid item style={{ margin: "0px 20px" }}>
              <Typography></Typography>
            </Grid>
            <Grid
              item
              style={{ margin: "0px 20px", cursor: "pointer" }}
              onClick={() => handleActive("Affected")}
            >
              <Typography>Affected Companies</Typography>
              {activeTab === "Affected" && <hr className={classes.active} />}
            </Grid>
            <Grid item style={{ margin: "0px 20px" }}>
              <Typography></Typography>
            </Grid>
            <Grid item style={{ margin: "0px 20px" }}>
              <Typography></Typography>
            </Grid>
            {sessionStorage.getItem("token") !== null && (
              <Grid
                item
                style={{ margin: "0px 20px", cursor: "pointer" }}
                onClick={handleMyTrack}
              >
                <Typography>My Tracked Companies</Typography>
                {activeTab === "Tracked" && <hr className={classes.active} />}
              </Grid>
            )}
          </Grid>
        </Paper>
        {activeTab === "All" && (
          <Paper component="form" className={classes.root2}>
            <InputBase
              className={classes.input}
              placeholder="Search "
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleSearch}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
              // onClick={handleSearch}
            >
              <SearchIcon style={{ width: "30px", height: "30px" }} />
            </IconButton>
          </Paper>
        )}

        <Grid style={{ marginTop: "20px" }} className={classes.root}>
          {activeTab === "All" ? (
            <div style={{ width: "100%", height: "65vh" }}>
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    height={height}
                    width={width}
                    rowHeight={100}
                    rowCount={filterPost.length}
                    rowRenderer={({ index, style }) => {
                      return (
                        <div style={style}>
                          <Paper
                            style={{
                              padding: "5px",
                              height: "50px",
                              width: "80%",
                              margin: "30px auto",
                            }}
                          >
                            <Grid container>
                              <Grid
                                item
                                sm={10}
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  history.push(
                                    `/stonks/stock_info/${filterPost[index]["Company Name"]}`
                                  )
                                }
                              >
                                <Typography style={{ fontSize: "1rem" }}>
                                  {filterPost[index]["Company Name"]}
                                  {/* {index} */}
                                </Typography>
                              </Grid>
                              <Grid item sm={2}>
                                <Button
                                  style={{
                                    height: "20px",
                                    fontSize: "0.8rem",
                                    color: "white",
                                    background: "blue",
                                    borderRadius: "20px",
                                  }}
                                  onClick={() =>
                                    handleTrack(
                                      filterPost[index]["Company Name"],
                                      filterPost[index]["Symbol"]
                                    )
                                  }
                                >
                                  Track
                                </Button>
                              </Grid>
                            </Grid>
                          </Paper>
                        </div>
                      );
                    }}
                  />
                )}
              </AutoSizer>
            </div>
          ) : activeTab === "Affected" ? (
            affectedCompanies.map((single, index) => {
              return (
                <Paper
                  style={{
                    padding: "5px",
                    height: "50px",
                    width: "100%",
                    margin: "30px 0",
                  }}
                >
                  <Grid container>
                    <Grid
                      item
                      sm={10}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        history.push(`/stonks/stock_info/${single.companyName}`)
                      }
                    >
                      <Typography style={{ fontSize: "1rem" }}>
                        {single.companyName}
                      </Typography>
                    </Grid>
                    <Grid item sm={2}>
                      <Button
                        style={{
                          height: "20px",
                          fontSize: "0.8rem",
                          color: "white",
                          background: "blue",
                          borderRadius: "20px",
                        }}
                        onClick={() =>
                          handleTrack(single["companyName"], single["symbol"])
                        }
                      >
                        Track
                      </Button>
                    </Grid>
                    <Grid item sm={12}>
                      <IconButton
                        style={{
                          padding: "0px",
                          color:
                            single.sentiment.label === "positive"
                              ? "green"
                              : "red",
                        }}
                      >
                        {single.sentiment.label === "positive" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })
          ) : loading ? (
            <SmallLoader />
          ) : myTracks.length === 0 ? (
            <h5>You are Not Tracking any company</h5>
          ) : (
            myTracks.map((single, index) => {
              return (
                <Paper
                  style={{
                    padding: "5px",
                    height: "50px",
                    width: "100%",
                    margin: "30px 0",
                  }}
                >
                  <Grid container>
                    <Grid
                      item
                      sm={10}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        history.push(`/stonks/stock_info/${single.companyName}`)
                      }
                    >
                      <Typography style={{ fontSize: "1rem" }}>
                        {single.companyName}
                      </Typography>
                    </Grid>
                    <Grid item sm={2}>
                      <Button
                        style={{
                          height: "20px",
                          fontSize: "0.8rem",
                          color: "white",
                          background: "blue",
                          borderRadius: "20px",
                        }}
                        onClick={() =>
                          handleStopTrack(
                            single["companyName"],
                            single["symbol"]
                          )
                        }
                      >
                        Remove Tracker
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })
          )}
        </Grid>
      </div>
    </div>
  );
};

export default SubBar;

// (
//   <FixedSizeList
//     height={500}
//     width={500}
//     itemSize={70}
//     itemCount={1000}
//   >
//     {Row}
//   </FixedSizeList>
// )

{
  /* filterPost.map((single) => {
                return (
                  <Paper
                    style={{
                      padding: "5px",
                      height: "50px",
                      width: "100%",
                      margin: "30px 0",
                    }}
                  >
                    <Grid container>
                      <Grid item sm={10}>
                        <Typography style={{ fontSize: "1rem" }}>
                          {single["Company Name"]}
                        </Typography>
                      </Grid>
                      <Grid item sm={2}>
                        <Button
                          style={{
                            height: "20px",
                            fontSize: "0.8rem",
                            color: "white",
                            background: "blue",
                            borderRadius: "20px",
                          }}
                          onClick={() =>
                            handleTrack(
                              single["Company Name"],
                              single["Symbol"]
                            )
                          }
                        >
                          Track
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              }) */
}

{
  /* <div style={{ width: "100%", height: "100vh" }}>
              <AutoSizer>
                {({ width, height }) => (
                  <FixedSizeList
                    height={height}
                    width={width}
                    itemSize={70}
                    itemCount={ITEM_COUNT}
                  >
                    {Row}
                  </FixedSizeList>
                )}
              </AutoSizer>
            </div> */
}

{
  /* <Paper
                    style={{
                      padding: "5px",
                      height: "50px",
                      width: "100%",
                      margin: "30px 0",
                    }}
                  >
                    <Grid container>
                      <Grid item sm={10}>
                        <Typography style={{ fontSize: "1rem" }}>
                          {single["Company Name"]}
                        </Typography>
                      </Grid>
                      <Grid item sm={2}>
                        <Button
                          style={{
                            height: "20px",
                            fontSize: "0.8rem",
                            color: "white",
                            background: "blue",
                            borderRadius: "20px",
                          }}
                          onClick={() =>
                            handleTrack(
                              single["Company Name"],
                              single["Symbol"]
                            )
                          }
                        >
                          Track
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper> */
}

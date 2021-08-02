import { Grid, Paper, Button, Typography, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const CryptoNewsCard = ({ newsData }) => {
  const history = useHistory();

  return (
    <div>
      <Paper
        elevation={2}
        style={{
          width: "80%",
          // height: "200px",
          padding: "20px",
          margin: "0px auto 10px",
          background: "#d3d3d35c",
        }}
      >
        <Grid container>
          <Grid item sm={4} onClick={() => window.open(newsData.url)}>
            <img
              src={
                newsData.originalImageUrl
                  ? newsData.originalImageUrl
                  : "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              style={{ height: "200px", width: "300px", borderRadius: "10px" }}
            />
          </Grid>
          <Grid item container sm={8}>
            <Grid item sm={12} style={{ fontSize: "1.3rem" }}>
              {newsData.title}
            </Grid>
            <Grid item sm={12} style={{ color: "#0000007a" }}>
              {newsData.description}
            </Grid>
            <Grid item sm={12}>
              {newsData.coins.map((coin) => (
                <a
                  href={`/crypto/search/${coin.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    style={{
                      background: "#ca2d49",
                      fontSize: "0.6rem",
                      borderRadius: "20px",
                      height: "20px",
                      color: "white",
                      margin: "0 5px",
                    }}
                    // onClick={() => history.push(`/crypto/search/${coin.name}`)}
                  >
                    {coin.name}
                  </Button>
                </a>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CryptoNewsCard;

import React, { useState, useEffect } from "react";
import {
  InfiniteLoader,
  List,
  WindowScroller,
  AutoSizer,
} from "react-virtualized";
import { FixedSizeList } from "react-window";
import Axios from "axios";
import { Grid, makeStyles } from "@material-ui/core";
import { Paper, Typography, Button, IconButton } from "@material-ui/core";

let ITEM_COUNT = 1000;

const Sample = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    Axios({
      url: "https://stonks-bandito.herokuapp.com/company/all",
      method: "get",
      headers: {},
    })
      .then((res) => {
        console.log(res.data);
        setArr(res.data);
        // ITEM_COUNT = arr.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Row = ({ index, style }) => {
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
            <Grid item sm={10}>
              <Typography style={{ fontSize: "1rem" }}>
                {arr[index]["Company Name"]}
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
                //   onClick={() =>
                //     handleTrack(
                //       arr[index]["Company Name"],
                //       arr[index]["Symbol"]
                //     )
                //   }
              >
                Track
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };

  return (
    // <div style={{ width: "100%", height: "100vh" }}>
    //   <AutoSizer>
    //     {({ width, height }) => (
    <FixedSizeList
      height={500}
      width={500}
      itemSize={70}
      itemCount={ITEM_COUNT}
    >
      {Row}
    </FixedSizeList>
  );
};

export default Sample;

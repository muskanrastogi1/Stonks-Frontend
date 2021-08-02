import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Typography, IconButton, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Axios from "axios";
import useLoading from "../components/hooks/loading-hook";
import Loader from "../components/loader";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StockInfo = (props) => {
  const {
    match: { params },
  } = props;

  const classes = useStyles();
  const [loading, setLoad, unsetLoad] = useLoading(true);

  const location = useLocation();

  const [info, setInfo] = useState([]);

  useEffect(() => {
    setLoad();
    var config = {
      method: "get",
      url: `https://stocks-un.herokuapp.com/stock/info/?query=${params.company}`,
      headers: {},
    };

    Axios(config)
      .then(function (res) {
        console.log(res.data);
        setInfo(res.data.data);
        unsetLoad();
      })
      .catch(function (error) {
        unsetLoad();
        console.log(error);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{ textAlign: "center" }}>
      <Typography style={{ fontSize: "1.6rem", marginTop: "20px" }}>
        Key parameters for {params.company} :
      </Typography>

      <div>
        <TableContainer
          component={Paper}
          style={{ width: "60%", margin: "10px auto" }}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: "#245254" }}>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Parameter
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell
                  style={{ fontWeight: "bold", color: "white" }}
                  align="right"
                >
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  NSE ID
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{info.NSEID}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  BSE ID
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{info.BSEID} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Market Cap
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">(Rs. Crore)</TableCell>
                <TableCell align="right">{info.MKTCAP}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Face Value (FV)
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">(Rs.)</TableCell>
                <TableCell align="right">{info.FV}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Book Value (BV)
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">(Rs.)</TableCell>
                <TableCell align="right">{info.BV}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  P/B Ratio
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{info.PB} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  P/E Ratio
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{info.PE} </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  Price- Current
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">(Rs.)</TableCell>
                <TableCell align="right">{info.pricecurrent} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Price- Prev. Closed
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">(Rs.)</TableCell>
                <TableCell align="right">{info.priceprevclose} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cash Earnings Per Share(CEPS)
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">(Rs.)</TableCell>
                <TableCell align="right">{info.CEPS}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Dividend Yield
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">(%)</TableCell>
                <TableCell align="right">{info.DY}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  5 Day Moving Avg.
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{info["5DayAvg"]} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  50 Day Moving Avg.
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{info["50DayAvg"]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  200 Day Moving Avg,
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{info["200DayAvg"]} </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default StockInfo;

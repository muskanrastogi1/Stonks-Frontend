import { Grid, Paper, Button, Typography, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import useLoading from "../components/hooks/loading-hook";
import SmallLoader from "../components/smallLoader";

const NewsCard = ({ newsData, type }) => {
  const history = useHistory();
  const [loading, setLoad, unsetLoad] = useLoading(true);

  const [entities, setEntities] = useState([]);
  const [clicked, setClicked] = useState(false);
  const handleAnalyse = () => {
    setLoad();
    var data = {
      title: newsData.title,
      news: newsData.news,
      imageURL: newsData.imageURL,
      date: newsData.date,
      time: newsData.time,
      inshortslink: newsData.inshortslink,
    };

    // history.push("/analyse", [
    //   {
    //     newsData: data,
    //   },
    // ]);

    // console.log(data);

    var config = {
      method: "post",
      url: "https://stonks-un.herokuapp.com/news/analyze",
      headers: {},
      data: data,
    };

    Axios(config)
      .then(function (res) {
        console.log(res.data);
        setEntities(res.data.companyArr);
        setClicked(true);
        unsetLoad();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Paper
        elevation={2}
        style={{
          width: "80%",
          height: "200px",
          padding: "20px",
          margin: "0px auto 10px",
          background: "#d3d3d35c",
        }}
      >
        <Grid container>
          <Grid item sm={4}>
            <img
              src={
                type === "general" && newsData.imageURL
                  ? newsData.imageURL
                  : type !== "general" && newsData.urlToImage
                  ? newsData.urlToImage
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
              {type === "general" ? newsData.news : newsData.description}
            </Grid>
            {type === "general" && (
              <Grid
                item
                container
                sm={12}
                style={{ marginTop: "5px" }}
                justify="flex-end"
              >
                <Grid item sm={4}>
                  <Button
                    style={{
                      width: "30px",
                      background: "blue",
                      fontSize: "0.7rem",
                      borderRadius: "5px",
                      height: "30px",
                      color: "white",
                    }}
                    onClick={handleAnalyse}
                  >
                    Analyse
                  </Button>
                </Grid>
                <Grid item sm={8}>
                  {loading ? (
                    <SmallLoader />
                  ) : entities.length === 0 && clicked ? (
                    <span style={{ fontWeight: "bold", color: "#bf3434" }}>
                      *This news does not effect any company's stock in NSE or
                      BSE.
                    </span>
                  ) : (
                    entities.map((entity) => (
                      <>
                        <Button
                          style={{
                            background: "#ca2d49",
                            fontSize: "0.6rem",
                            borderRadius: "20px",
                            height: "20px",
                            color: "white",
                          }}
                          onClick={() =>
                            history.push(`/search/${entity["Company Name"]}`)
                          }
                        >
                          {entity["Company Name"]}
                        </Button>
                        {entity.sentiment.label === "positive" ? (
                          <IconButton
                            style={{
                              padding: "0px",
                              color: "green",
                              margin: "0 5px",
                            }}
                          >
                            <i className="fas fa-arrow-circle-up"></i>
                          </IconButton>
                        ) : entity.sentiment.label === "negative" ? (
                          <IconButton
                            style={{
                              padding: "0px",
                              color: "red",
                              margin: "0 5px",
                            }}
                          >
                            <i className="fas fa-arrow-circle-down"></i>
                          </IconButton>
                        ) : (
                          <IconButton
                            style={{
                              padding: "0px",
                              color: "#c0c02b",
                              margin: "0 5px",
                            }}
                          >
                            <i className="fas fa-minus-circle"></i>
                          </IconButton>
                        )}
                      </>
                    ))
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default NewsCard;

// (
//   <span style={{ fontWeight: "bold", color: "#bf3434" }}>
//     *This news does not effect any company's stock in NSE or
//     BSE.
//   </span>
// )

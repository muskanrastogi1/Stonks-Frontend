import React, { useState, useEffect } from "react";
import SubBar from "../components/SubBar";
import { Button, Typography, IconButton, Paper, Grid } from "@material-ui/core";
import useLoading from "../components/hooks/loading-hook";
import Loader from "../components/loader";
import Axios from "axios";

const Companies = () => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [affectedCompanies, setAffectedCompanies] = useState([]);

  const [loading, setLoad, unsetLoad] = useLoading(true);

  useEffect(() => {
    setLoad();
    var config = {
      url: "https://stocks-un.herokuapp.com/company/all",
      method: "get",
      headers: {},
    };

    Axios(config)
      .then(function (res) {
        console.log(res.data);
        setAllCompanies(res.data);
        unsetLoad();
      })
      .catch(function (error) {
        unsetLoad();
        console.log(error);
      });

    var config2 = {
      method: "get",
      url: "https://stocks-un.herokuapp.com/company/allAffected",
      headers: {},
    };

    Axios(config2)
      .then(function (res) {
        console.log(res.data);
        setAffectedCompanies(res.data.companies);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Axios.all([
    //   Axios.get("https://stocks-un.herokuapp.com/company/all", config),
    //   Axios.get(
    //     "https://stocks-un.herokuapp.com/company/allAffected",
    //     config2
    //   ),
    // ])
    //   .then(
    //     Axios.spread((res1, res2) => {
    //       console.log(res1, res2);
    //       setAllCompanies(res1.data);
    //       setAffectedCompanies(res2.data.companies);
    //       unsetLoad();
    //     })
    //   )
    //   .catch((errs) => {
    //     console.log(errs);
    //   });
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <SubBar
        allCompanies={allCompanies}
        affectedCompanies={affectedCompanies}
      />
    </div>
  );
};

export default Companies;

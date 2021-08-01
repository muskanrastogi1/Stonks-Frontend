import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Companies from "../Screens/Companies";
import Home from "../Screens/Home";
import HomeSearch from "../Screens/HomeSearch";
import Login from "../Screens/Login";
import StockInfo from "../Screens/StockInfo";
import Report from "../Screens/Report";
import Sample from "../Screens/sample";
import Signup from "../Screens/Signup";
import CryptoNews from "../Screens/CryptoNews";
import Stonks from "./stonks";
import Crypto from "./crypto";

const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Stonks} />
        <Route path="/stonks" component={Stonks} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        {/* Crypto routes */}
        {/* <Route exact path="/crypto_news" component={CryptoNews} /> */}
        <Route path="/crypto" component={Crypto} />
      </Switch>
    </div>
  );
};

export default Router;

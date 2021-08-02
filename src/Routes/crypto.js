import React from "react";
import { Route, Switch } from "react-router-dom";
import NavbarCrypto from "../components/NavbarCrypto";
import Companies from "../Screens/Companies";
import Home from "../Screens/Home";
import HomeSearch from "../Screens/HomeSearch";
import Login from "../Screens/Login";
import StockInfo from "../Screens/StockInfo";
import Report from "../Screens/Report";
import Signup from "../Screens/Signup";
import CryptoNews from "../Screens/CryptoNews";
import Coins from "../Screens/Coins";

const Crypto = () => {
  return (
    <div>
      <NavbarCrypto />
      <Switch>
        <Route exact path="/crypto" component={CryptoNews} />
        <Route path="/crypto/crypto_news" component={CryptoNews} />
        <Route path="/crypto/search/:coin" component={CryptoNews} />
        <Route path="/crypto/coins" component={Coins} />
      </Switch>
    </div>
  );
};

export default Crypto;

import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { MainProvider } from "./Context.js";
import { Izvestaj } from "./Izvestaj.js";
import { Komentari } from "./Komentari.js";
import { Main } from "./Main.js"
import { Profil } from "./Profil.js"
import { Serviseri } from "./Serviseri/Serviseri";

export const Sadrzaj = () => {


  return (
    <Router>
      <header>
        <img src="http://cdn.mikroe.com/img/mega-menu/mikroe-timesaving-white.png" alt="logo"/>
        <ul>
          <li><Link to="/" className="linkHeader">PREGLED SVIH VOZILA</Link></li>
          <li><Link to="/serviseri" className="linkHeader">SERVISERI I EKSTERNI SARADNICI</Link></li>
          <li><Link to="/izvestaj" className="linkHeader">IZVEŠTAJI</Link></li>
          <li><Link to="/komentari" className="linkHeader">KOMENTARI</Link></li>
        </ul>
      </header>
      <Switch>
        <MainProvider>
          <Route path="/" exact><Main /></Route>
          <Route path="/profil/:carId" exact><Profil /></Route>
          <Route path="/serviseri" exact><Serviseri /></Route>
          <Route path="/izvestaj" exact><Izvestaj /></Route>
          <Route path="/komentari" exact><Komentari /></Route>
        </MainProvider>
      </Switch>
    </Router>
  );
}

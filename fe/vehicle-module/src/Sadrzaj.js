import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { MainProvider } from "./Context.js";
import { Izvestaj } from "./Izvestaj.js";
import { Login } from "./Login.js";
import { Main } from "./Main.js"
import { Profil } from "./Profil.js"
import { Serviseri } from "./Serviseri/Serviseri";
import "./style/input.css"

export const Sadrzaj = () => {


  return (
    <Router>
      <header>
        <nav>
         <img src="http://cdn.mikroe.com/img/mega-menu/mikroe-timesaving-white.png" alt="logo" />
          <ul>
            <Link to="/" className="linkHeader"><li><i className="fas fa-car-side hed"></i> <strong>Pregled svih vozila</strong></li></Link>
            <Link to="/serviseri" className="linkHeader"><li> <i className="fas fa-tools hed "></i> <strong>Serviseri i eksterni saradnici</strong></li></Link>
            <Link to="/izvestaj" className="linkHeader"><li> <i className="fas fa-file-invoice hed"></i> <strong>Izveštaji</strong></li></Link>
          </ul>
        </nav>
      </header>

      <Switch>
        <MainProvider>
          <Route path="/" exact><Main /></Route>
          <Route path="/profil/:carId" exact><Profil /></Route>
          <Route path="/serviseri" exact><Serviseri /></Route>
          <Route path="/izvestaj" exact><Izvestaj /></Route>
          <Route path="/login" exact><Login /></Route>
        </MainProvider>
      </Switch>
    </Router>
  );
}

import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { Main } from "./Main.js"
import {Profil} from "./Profil.js"


export const Sadrzaj = () => {
  return (
    <Router>
      <header>
        <h1>Pregled svih vozila</h1>
        <ul>
          <li><Link to="/" className="linkHeader">PREGLED SVIH VOZILA</Link></li>
          <li><Link to="/profil" className="linkHeader">PROFIL VOZILA</Link></li>
          <li><Link className="linkHeader">SERVISERI I EKSTERNI SARADNICI</Link></li>
          <li><Link className="linkHeader">IZVEŠTAJI</Link></li>
          <li><Link className="linkHeader">KOMENTARI</Link></li>
        </ul>
      </header>
      <Switch>
        <Route path="/" exact><Main /></Route>
        <Route path="/profil" exact><Profil /></Route>
      </Switch>
    </Router>
  );
}

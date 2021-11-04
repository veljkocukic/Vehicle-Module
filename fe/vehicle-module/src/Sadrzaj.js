import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { MainProvider} from "./Context.js";
import { Izvestaj } from "./Izvestaj.js";
import { Komentari } from "./Komentari.js";
import { Main } from "./Main.js"
import { Profil } from "./Profil.js"
import { Serviseri } from "./Serviseri.js";

export const Sadrzaj = () => {


  let text = useRef(null)

  const handleClick = (e) => {
    text.current.innerText = e.target.innerText
  }

  return (
    <Router>
      <header>
        <h1 ref={text}>Pregled svih vozila</h1>
        <ul>
          <li><Link onClick={handleClick} to="/" className="linkHeader">PREGLED SVIH VOZILA</Link></li>
          <li><Link onClick={handleClick} to="/profil" className="linkHeader">PROFIL VOZILA</Link></li>
          <li><Link onClick={handleClick} to="/serviseri" className="linkHeader">SERVISERI I EKSTERNI SARADNICI</Link></li>
          <li><Link onClick={handleClick} to="/izvestaj" className="linkHeader">IZVEŠTAJI</Link></li>
          <li><Link onClick={handleClick} to="/komentari" className="linkHeader">KOMENTARI</Link></li>
        </ul>
      </header>
      <Switch>
        <MainProvider>
            <Route path="/" exact><Main /></Route>
            <Route path="/profil" exact><Profil /></Route>
            <Route path="/profil/:carId" exact><Profil /></Route>
            <Route path="/serviseri" exact><Serviseri /></Route>
            <Route path="/izvestaj" exact><Izvestaj /></Route>
            <Route path="/komentari" exact><Komentari /></Route>
        </MainProvider>
      </Switch>
    </Router>
  );
}

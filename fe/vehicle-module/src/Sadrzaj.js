import React, { useState,useRef } from "react";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import { MainProvider } from "./Context.js";
import { Izvestaj } from "../src/Izvestaji/Izvestaj";
import { Login } from "./Login.js";
import { Main } from "./Main.js"
import { Profil } from "./Profil.js"
import { Serviseri } from "./Serviseri/Serviseri";
import "./style/input.css"

export const Sadrzaj = () => {
  let loginName = localStorage.getItem("username")
  let side = useRef(null)
  let [menuOn,setMenuOn] = useState(false)
  const handleMenu = (e)=>{
    if(!menuOn){
      e.target.style = "transform:rotate(-90deg)"
      side.current.style="left:0"
      setMenuOn(true)
    }else if(menuOn){
      e.target.style = "transform:rotate(0)"
      side.current.style="left:-15vw"
      setMenuOn(false)
    }
  }
  const handleLogout = () =>{
    localStorage.clear()
    localStorage.setItem("username","")
    window.location.replace("/login");
  }

  return (
    <Router>

      <div onClick={handleMenu} className="hamburger">
        <img src="https://erp.mikroe.com/img/users/avatars/mikroe-symbol-new.png" alt="menu" />
      </div>

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

      <div ref={side} className="sidebar">

        <div className="upperDiv">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile-pic"></img>
          <h3>Korisnik: {loginName}</h3>
        </div>

        <h3 style={{cursor:"pointer"}} onClick={handleLogout} >Odjavi se <i class="fas fa-sign-out-alt"></i></h3>
      </div>

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

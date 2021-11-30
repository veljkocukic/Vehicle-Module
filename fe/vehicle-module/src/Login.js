import React,{useState} from "react"

import "./style/login.css"

export const Login = () =>{
    let [name,setName] = useState("")
    let [pass,setPass] = useState("")

    const handleSubmit = () =>{
        console.log("r")
    }

    return(
    <div className="login">
            
            <div className="input--container login-container">

                <div className="login-top">
                <img src="https://cdn.mikroe.com/cms/press-kit/mikroe-logo-dark.png" alt="logo"/>
                </div>


            <h2>Modul vozila</h2>
                <form className="login-form">
                <div className="single-input-container login-single">
                    <label for="korisnicko-ime" className="standard--label">Korisničko ime</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} className="standard--input login-input" id="korisnicko-ime" name="korisnicko-ime" />
                </div>

                <div className="single-input-container login-single">
                    <label for="lozinka" className="lozinka">Lozinka</label>
                    <input type="password" onChange={(e) => setPass(e.target.value)} className="standard--input login-input" id="lozinka" name="lozinka" />
                </div>

                <div className="input--container__btns login-btns">
                    <button className="btn yes login-btn" onClick={handleSubmit}><i class="fas fa-sign-in-alt"></i>    LOGIN</button>
                    <p>Zaboravljena lozinka?</p>
                </div>
                </form>

            </div>

        </div>)
}
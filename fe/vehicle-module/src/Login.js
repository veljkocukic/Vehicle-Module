import React, { useState, useEffect } from "react"
import axios from "axios"
import "./style/login.css"
import { useHistory } from "react-router-dom"
import { Spiner } from "./ProfilPolja/Editi/Spiner"
export const Login = () => {
    let [name, setName] = useState("")
    let [pass, setPass] = useState("")
    let [userFalse, setUserFalse] = useState(false)
    let [passFalse, setPassFalse] = useState(false)
    let [loginSpinner, setLoginSpinner] = useState(false)

    let history = useHistory()


    useEffect(() => {
        const checkLogin = async () => {
            await axios.post("https://vehicle-module.herokuapp.com/api/v1/logincheck", { "token": localStorage.getItem("token") }).then(res => {
                if (res.data === "success") {
                    history.push("/")
                } else {
                    return
                }
            })
        }
        checkLogin()
    }, [])





    const handleSubmit = async (e) => {
        setLoginSpinner(true)
        e.preventDefault()
        let verifyName = name.length > 2
        let verifyPass = pass.length > 2


        if (verifyName && verifyPass) {
            await axios.post("https://vehicle-module.herokuapp.com/api/v1/login", { name, pass }).then(res => {
                console.log(res.data)
                if (res.data.error === "user") {
                    setUserFalse(true)
                } else if (res.data.error === "pass") {
                    setPassFalse(true)
                } else if (res.data.catch) {
                    alert("Došlo je do greške")
                    console.log(res.data.catch)
                } else {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("username", name)
                    return history.push("/")
                }
                setLoginSpinner(false)
            }).catch(error => alert(error))
        } else {
            !verifyName ? setUserFalse(true) : setUserFalse(false)
            !verifyPass ? setPassFalse(true) : setUserFalse(false)
            setLoginSpinner(false)
        }

    }

    return (
        <div className="login">
            {loginSpinner && <Spiner />}
            <div className="input--container login-container">

                <div className="login-top">
                    <img src="https://cdn.mikroe.com/cms/press-kit/mikroe-logo-dark.png" alt="logo" />
                </div>


                <h2>Modul vozila</h2>
                <form className="login-form">
                    <div className="single-input-container login-single">
                        <label htmlFor="korisnicko-ime" className="standard--label">Korisničko ime</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} className="standard--input login-input" id="korisnicko-ime" name="korisnicko-ime" />
                        {userFalse && <p style={{ color: "red", fontSize: "0.8em" }}>Korisničko ime nije ispravno</p>}
                    </div>

                    <div className="single-input-container login-single">
                        <label htmlFor="lozinka" className="lozinka">Lozinka</label>
                        <input type="password" onChange={(e) => setPass(e.target.value)} className="standard--input login-input" id="lozinka" name="lozinka" />
                        {passFalse && <p style={{ color: "red", fontSize: "0.8em" }}>Lozinka nije ispravna</p>}

                    </div>

                    <div className="input--container__btns login-btns">
                        <button className="btn yes login-btn" onClick={handleSubmit}><i className="fas fa-sign-in-alt"></i>    LOGIN</button>
                        <p>Zaboravljena lozinka?</p>
                    </div>
                </form>

            </div>

        </div>)
}
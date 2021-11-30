import React, { useEffect, useState } from "react";
import "../style/izvestaj.css"
import { Menu } from "./Menu"
import { Table } from "./Table";
import { MalaTabela } from "./MalaTabela";
import { Grafik } from "./Grafik";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
export const Izvestaj = () => {

    let smallTableOn = useSelector(state => state.smallTableReducer)
    let [bigTableOn, setBigTableOn] = useState(false)
    let history = useHistory()
    useEffect(()=>{
        const checkLogin = async () =>{
            await axios.post("http://localhost:5000/api/v1/logincheck",{"token": localStorage.getItem("token")}).then(res => {
               if(res.data!=="success"){
                    history.push("/login")
                   return
               }
            })
        }
        checkLogin()
    },[])
    return (
        <div className="izvestaj">
            <div className="page-title">
                <h1>Izveštaji</h1>
            </div>
            <Menu sbt={setBigTableOn} />
            {bigTableOn && <Table />}
            {bigTableOn && <Grafik />}
            {smallTableOn && <MalaTabela />}
        </div>
    )
}
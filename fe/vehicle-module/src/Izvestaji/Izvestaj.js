import React, { useState } from "react";
import "../style/izvestaj.css"
import { Menu } from "./Menu"
import { Table } from "./Table";
import { MalaTabela } from "./MalaTabela";
import { Grafik } from "./Grafik";
import { useSelector } from "react-redux";
export const Izvestaj = () => {

    let smallTableOn = useSelector(state => state.smallTableReducer)
    let [bigTableOn, setBigTableOn] = useState(false)
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
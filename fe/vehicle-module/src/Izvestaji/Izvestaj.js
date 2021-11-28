import React, { useState, useContext } from "react";
import "../style/izvestaj.css"
import { Menu } from "./Menu"
import { Table } from "./Table";
import { MalaTabela } from "./MalaTabela";
import { DataContext } from "../Context";
export const Izvestaj = () => {

    let { smallTableOn } = useContext(DataContext)
    let [bigTableOn, setBigTableOn] = useState(false)
    return (
        <div className="izvestaj">
            <div className="page-title">
                <h1>Izveštaji</h1>
            </div>
            <Menu sbt={setBigTableOn} />
            {bigTableOn && <Table />}
            {smallTableOn && <MalaTabela gorivo />}
        </div>
    )
}
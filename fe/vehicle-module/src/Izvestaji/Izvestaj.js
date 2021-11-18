import React,{useState,useRef,useEffect, useContext} from "react";
import "../style/izvestaj.css"
import { Menu } from "./Menu"
import { Table } from "./Table";
import { MalaTabela } from "./MalaTabela";
export const Izvestaj = () => {

    
    return(
        <div className="izvestaj">
            <div className="page-title">
                <h1>Izveštaji</h1>
            </div>
            <Menu />
             <Table />
            {/*<MalaTabela gorivo/> */}
        </div>
    )
}
import React,{useState} from "react";
import "../style/izvestaj.css"
import { Menu } from "./Menu"
import { Table } from "./Table";
import { MalaTabela } from "./MalaTabela";
export const Izvestaj = () => {

    let [bigTableOn,setBigTableOn] = useState(false)
    return(
        <div className="izvestaj">
            <div className="page-title">
                <h1>Izveštaji</h1>
            </div>
            <Menu sbt={setBigTableOn}/>
             {bigTableOn && <Table />}
            {/*<MalaTabela gorivo/> */}
        </div>
    )
}
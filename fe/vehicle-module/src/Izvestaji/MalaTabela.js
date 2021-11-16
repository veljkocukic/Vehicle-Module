import React,{useState,useEffect,useRef} from "react"
import axios from "axios"
import { DataContext } from "../Context"

export const MalaTabela = ({gorivo,car,period}) =>{



    let span5 = gorivo ? 5 : 3
    let span3 = gorivo ? 3 : 1 

    let dataSmall = {name:"Audi A4 - BG-1009-AG",dateFrom:"02.02.20002.",dateTo:"20.12.2020.",data:[{trosak:"Gorivo",datum:"03.01.2020",potrosnja:25,cena:143.12,ukupno:3578},
    {trosak:"Gorivo",datum:"11.01.2020",potrosnja:30,cena:142.69,ukupno:4.281},
    {trosak:"Gorivo",datum:"19.01.2020",potrosnja:32,cena:143.56,ukupno:4594}],total:12452,potrosnjaTotal:87,cena:""} 
    return(
        <table className="tg mala-tabela">

            <thead>
                <tr>
                    <th colSpan={span5}>Službeno vozilo</th>
                </tr>
            </thead>
            <tbody>
                <tr><td colSpan={span5}><strong>{dataSmall.name}</strong></td></tr>
                <tr><td colSpan="2" className="head-table">Datum od</td> <td colSpan={span3} className="head-table">Datum do</td> </tr>
                <tr><td colSpan="2" >{dataSmall.dateFrom}</td> <td colSpan={span3}>{dataSmall.dateTo}</td> </tr>
                <tr><td className="head-table">Trošak</td> <td className="head-table">Datum</td>{gorivo&&<td className="head-table">Potrošnja (l) </td>} <td className="head-table">Cena (din.)</td>{gorivo && <td className="head-table">Ukupno (din.)</td>}</tr>
                {dataSmall.data.map(item=><tr><td>{item.trosak}</td><td>{item.datum}</td>{gorivo&&<td>{item.potrosnja}</td>}<td>{item.cena}</td>{gorivo&&<td>{item.ukupno.toLocaleString()}</td>}</tr>)}
                <tr><td className="head-table">Ukupno</td><td className="head-table"></td><td className="head-table">{dataSmall.potrosnjaTotal}</td><td className="head-table"></td>{gorivo&&dataSmall.cena}<td className="head-table">{dataSmall.total.toLocaleString()}</td></tr>
                <tr><td colSpan={span5}><button className="btn no menu-excell" ><i class="far fa-file-excel menu-icon"></i> EXPORT U EXCELL</button></td></tr>
            </tbody>
        </table>
    )

}
import React, { useContext } from "react"
import { DataContext } from "../Context"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useSelector } from "react-redux";



export const MalaTabela = () => {


    let { formatDate,vremeTab,minsToTime } = useContext(DataContext)
    let dataSmall = useSelector(state=>state.dataSmallReducer)
    let gorivo = dataSmall.naziv === "gorivoPolje"
    let span5 = gorivo ? 5 : 3
    let span3 = gorivo ? 3 : 1

    return (
        <table className="tg mala-tabela" id="mala-tabela-export">

            <thead>
                <tr>
                    <th colSpan={span5}>Službeno vozilo</th>
                </tr>
            </thead>
            <tbody>
                <tr><td colSpan={span5}><strong>{dataSmall.name}</strong></td></tr>
                <tr><td colSpan="2" className="head-table">Datum od</td> <td colSpan={span3} className="head-table">Datum do</td> </tr>
                <tr><td colSpan="2" >{formatDate(dataSmall.dateFrom)}</td> <td colSpan={span3}>{formatDate(dataSmall.dateTo.datum)}</td> </tr>
                <tr><td className="head-table">Trošak</td> <td className="head-table">Datum</td>{gorivo && <td className="head-table">Potrošnja (l) </td>} <td className="head-table">{vremeTab ? "Vreme zaposlenog" : "Cena (din.)"}</td>{gorivo && <td className="head-table">Ukupno (din.)</td>}</tr>
                {dataSmall.data.map((item,key) => <tr key={key}><td>{item.trosak}</td><td>{formatDate(item.datum)}</td>{gorivo && <td>{item.potrosnja}</td>}<td>{vremeTab ? minsToTime(item.vreme) : item.cena}</td>{gorivo && <td>{item.ukupno.toLocaleString() }</td>}</tr>)}
                {/* <tr><td className="head-table">Ukupno</td><td className="head-table"></td><td className="head-table">{gorivo ? dataSmall.potrosnjaTotal : dataSmall.cena}</td>{gorivo && <td className="head-table"></td>}{gorivo && <td className="head-table">{dataSmall.total.toLocaleString()}</td>}</tr> */}
                <tr><td colSpan={span5}>
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="btn no menu-excell"
                        table="mala-tabela-export"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="EXPORT U EXCELL" /></td></tr>
            </tbody>
        </table>
    )

}
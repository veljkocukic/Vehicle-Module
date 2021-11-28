import React, { useContext } from "react"
import { DataContext } from "../Context"


export const MalaTabela = ({ gorivo, car, period }) => {



    let span5 = gorivo ? 5 : 3
    let span3 = gorivo ? 3 : 1

    let { dataSmall, formatDate } = useContext(DataContext)
    console.log(dataSmall)
    return (
        <table className="tg mala-tabela">

            <thead>
                <tr>
                    <th colSpan={span5}>Službeno vozilo</th>
                </tr>
            </thead>
            <tbody>
                <tr><td colSpan={span5}><strong>{dataSmall.name}</strong></td></tr>
                <tr><td colSpan="2" className="head-table">Datum od</td> <td colSpan={span3} className="head-table">Datum do</td> </tr>
                <tr><td colSpan="2" >{formatDate(dataSmall.dateFrom)}</td> <td colSpan={span3}>{formatDate(dataSmall.dateTo.datum)}</td> </tr>
                <tr><td className="head-table">Trošak</td> <td className="head-table">Datum</td>{gorivo && <td className="head-table">Potrošnja (l) </td>} <td className="head-table">Cena (din.)</td>{gorivo && <td className="head-table">Ukupno (din.)</td>}</tr>
                {dataSmall.data.map(item => <tr><td>{item.trosak}</td><td>{item.datum}</td>{gorivo && <td>{item.potrosnja}</td>}<td>{item.cena}</td>{gorivo && <td>{item.ukupno.toLocaleString()}</td>}</tr>)}
                {/* <tr><td className="head-table">Ukupno</td><td className="head-table"></td><td className="head-table">{gorivo ? dataSmall.potrosnjaTotal : dataSmall.cena}</td>{gorivo && <td className="head-table"></td>}{gorivo && <td className="head-table">{dataSmall.total.toLocaleString()}</td>}</tr> */}
                <tr><td colSpan={span5}><button className="btn no menu-excell" ><i className="far fa-file-excel menu-icon"></i> EXPORT U EXCELL</button></td></tr>
            </tbody>
        </table>
    )

}
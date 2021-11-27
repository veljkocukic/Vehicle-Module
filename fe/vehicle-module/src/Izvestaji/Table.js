import React, { useContext } from "react"
import axios from "axios"
import { DataContext } from "../Context"


const Kolone = ({ rb, vozilo, data, th, regBr }) => {

    const findName = (nm) => {
        let ind = data.indexOf(nm)
        return th[ind]
    }


    const handleSmallTable = async (date, polje) => {
        console.log(regBr)
        let firstDate = date[0].datum
        let lastDate = date[date.length - 1]
        await axios.post("http://localhost:5000/api/v1/tabela/", { regBr, firstDate, lastDate, polje }).then(res => console.log(res))


    }

    return (
        <tr>
            <td>{rb}</td>
            <td>{vozilo}</td>
            {data.map((item, key) => <td key={key} className="click-tab" onClick={() => handleSmallTable(item.svi.sort((a, b) => new Date(a.datum) - new Date(b.datum)), item.polje)} id={vozilo + "-" + findName(item)}>{item.ukupno.toLocaleString()}</td>)}
        </tr>
    )
}


export const Table = () => {

    let { dataTable, tableHead } = useContext(DataContext)

    let ar = []
    try {
        for (let i = 0; i < tableHead.length; i++) {
            ar.push(0)
        }

    } catch (error) {
        console.log(error)
    }

    for (let a of dataTable) {
        a.data.forEach(item => {
            let ind = a.data.indexOf(item)
            ar[ind] = item.ukupno + ar[ind]
        })
    }



    return (
        <table className="tg" id="excel-table">

            <thead>

                <tr>
                    <th>Rb</th>
                    <th>Službeno vozilo</th>
                    {tableHead.map(item => <th>{item}</th>)}
                </tr>
            </thead>
            <tbody>
                {dataTable.map((item, key) => <Kolone key={key} rb={item.rb} regBr={item.regBr} vozilo={item.vozilo} data={item.data} th={tableHead} />)}
                <tr >
                    <td className="head-table" colSpan="2">Ukupno</td>
                    {ar.map((item, key) => <td key={key} className="head-table click-tab">{item}</td>)}

                </tr>
            </tbody>
        </table>
    )
}
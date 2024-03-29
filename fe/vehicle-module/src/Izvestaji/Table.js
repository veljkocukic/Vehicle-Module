import React from "react"
import axios from "axios"
import { handleBroj } from "../state/actions"
import { handleIme } from "../state/actions"
import { handleSmallTableOn } from "../state/actions"
import { handleDataSmall } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
const Kolone = ({ rb, vozilo, data, th, regBr, naziv, todr, pokr }) => {

    const dispatch = useDispatch()
    const findName = (nm) => {
        let ind = data.indexOf(nm)
        return th[ind]
    }



    const handleSmallTable = async (date, polje) => {
        let firstDate = date[0].datum
        let lastDate = date[date.length - 1]
        await axios.post("http://localhost:5000/api/v1/tabela/", { regBr, firstDate, lastDate, polje, naziv, todr, pokr, date }).then(res => {
            dispatch(handleDataSmall(res.data))
            dispatch(handleSmallTableOn(true))
        })
        window.scrollTo(0,document.body.scrollHeight);
    }



    const handleGrafik = () => {
        dispatch(handleIme(vozilo))
        dispatch(handleBroj(rb))
    }


    return (
        <tr>
            <td>{rb}</td>
            <td style={{ cursor: "pointer", fontWeight: "bold" }} onClick={handleGrafik} >{vozilo}</td>
            {data.map((item, key) => <td key={key} className="click-tab" onClick={() => item.ukupno > 0 && handleSmallTable(item.svi.sort((a, b) => new Date(a.datum) - new Date(b.datum)), item.polje)} id={vozilo + "-" + findName(item)}>{item.ukupno.toLocaleString()}</td>)}
        </tr>
    )
}


export const Table = () => {

    let tableHead = useSelector(state=>state.tableHeadReducer)
    let dataTable = useSelector(state=>state.dataTableReducer)
    const dispatch = useDispatch()


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


    dispatch(handleIme(dataTable[0].vozilo))
    return (
        <table className="tg" id="excel-table">

            <thead>

                <tr>
                    <th>Rb</th>
                    <th>Službeno vozilo</th>
                    {tableHead.map((item,key) => <th key={key}>{item}</th>)}
                </tr>
            </thead>
            <tbody>
                {dataTable.map((item, key) => <Kolone key={key} rb={item.rb} regBr={item.regBr} vozilo={item.vozilo} data={item.data} th={tableHead} naziv={item.naziv} todr={item.todr} pokr={item.pokr} />)}
                <tr >
                    <td className="head-table" colSpan="2">Ukupno</td>
                    {ar.map((item, key) => <td key={key} className="head-table click-tab">{item}</td>)}
                </tr>
            </tbody>
        </table>
    )
}
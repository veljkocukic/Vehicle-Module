import React, { useContext } from "react"
import axios from "axios"
import { DataContext } from "../Context"


const Kolone = ({ setGrafikIme,setGrafikBroj,setDataSmall, setSmallTableOn, rb, vozilo, data, th, regBr, naziv, todr, pokr }) => {

    const findName = (nm) => {
        let ind = data.indexOf(nm)
        return th[ind]
    }


    const handleSmallTable = async (date, polje) => {
        let firstDate = date[0].datum
        let lastDate = date[date.length - 1]
        await axios.post("http://localhost:5000/api/v1/tabela/", { regBr, firstDate, lastDate, polje, naziv, todr, pokr,date }).then(res => {
            setDataSmall(res.data)
            setSmallTableOn(true)
        })
    }



    const handleGrafik = () =>{

        setGrafikIme(vozilo)
        setGrafikBroj(rb)
    }


    return (
        <tr>
            <td>{rb}</td>
            <td style={{cursor:"pointer",fontWeight:"bold"}} onClick={handleGrafik} >{vozilo}</td>
            {data.map((item, key) => <td key={key} className="click-tab" onClick={() => item.ukupno>0 && handleSmallTable(item.svi.sort((a, b) => new Date(a.datum) - new Date(b.datum)), item.polje)} id={vozilo + "-" + findName(item)}>{item.ukupno.toLocaleString()}</td>)}
        </tr>
    )
}


export const Table = () => {

    let { dataTable, tableHead, setDataSmall, setSmallTableOn,setGrafikBroj,setGrafikIme } = useContext(DataContext)

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
                {dataTable.map((item, key) => <Kolone key={key} rb={item.rb} regBr={item.regBr} vozilo={item.vozilo} data={item.data} th={tableHead} setDataSmall={setDataSmall} setSmallTableOn={setSmallTableOn} naziv={item.naziv} setGrafikBroj = {setGrafikBroj} setGrafikIme={setGrafikIme} todr={item.todr} pokr={item.pokr} />)}
                <tr >
                    <td className="head-table" colSpan="2">Ukupno</td>
                    {ar.map((item, key) => <td key={key} className="head-table click-tab">{item}</td>)}

                </tr>
            </tbody>
        </table>
    )
}
import React,{useState,useEffect,useRef} from "react"
import axios from "axios"
import { DataContext } from "../Context"


const Kolone = ({rb,vozilo,data,th}) =>{

    const findName = (nm) =>{
        let ind = data.indexOf(nm)
        return th[ind].title
        }

    return(
        <tr>
            <td>{rb}</td>
            <td>{vozilo}</td>
            {data.map(item=><td className="click-tab" id={vozilo+"-"+findName(item)}>{item.toLocaleString()}</td>)}
        </tr>
    )
}


export const Table = () =>{



    let tableHead=[{title:"Jan"},{title:"Feb"},{title:"Mart"},{title:"Apr"},{title:"Maj"},{title:"Jun"},{title:"Jul"},{title:"Avg"},{title:"Sept"},{title:"Okt"},{title:"Nov"},{title:"Dec"}]
    let dataTable = [{rb:1,vozilo:"Audi A4",data:[1,2,3,4,5,6,7,8,9,10,11,12]},{rb:2,vozilo:"Yugo Coral",data:[2,4,6,8,10,12,14,16,18,20,22,24]}]

    let ar = []
    for(let i=0;i<tableHead.length;i++){
        ar.push(0)
    }

    for(let a of dataTable){
        a.data.forEach(item=>{
            let ind = a.data.indexOf(item)
            ar[ind] = item+ar[ind]
        })
    }



    return(
        <table className="tg">

            <thead>

                <tr>
                    <th>Rb</th>
                    <th>Službeno vozilo</th>
                    {tableHead.map(item=><th>{item.title}</th>)}
                </tr>
            </thead>
            <tbody>
            {dataTable.map(item=><Kolone rb={item.rb} vozilo={item.vozilo} data={item.data} th={tableHead}/>)} 
            <tr >
                <td className="head-table" colSpan="2">Ukupno</td>
                {ar.map(item=><td className="head-table click-tab">{item}</td>)}

            </tr>
            </tbody>
        </table>
    )
}
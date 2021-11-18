import React,{useState,useEffect,useRef, useContext} from "react"
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

    let {dataTable,tableHead} = useContext(DataContext)


    let ar = []
    try {
        for(let i=0;i<tableHead.length;i++){
            ar.push(0)
        }
    
    } catch (error) {
        console.log(error)
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
                    {tableHead.map(item=><th>{item}</th>)}
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
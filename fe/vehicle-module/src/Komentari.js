import React from "react";

export const Komentari = () =>{

    let dataKom = [{name:"Marko Jovanovic",date:"29.09.2020",text:"Kako se vodi stepen amortizacije službenog vozila?",kom:"/",status:"QUESTION"}]

    const KoloneKomentari = (props) =>{
        return(
            <tr>
                <td>{props.name}</td>
                <td>{props.date}</td>
                <td>{props.text}</td>
                <td>{props.kom}</td>
                <td>{props.status}</td>
            </tr>
        )
    }


    return(
        <table className="tg servt">
            <thead>
               <tr>
                <th>Zaposleni</th>
                <th>Datum</th>
                <th>Predlog</th>
                <th>Komentar</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {dataKom.map((item,key)=> <KoloneKomentari name={item.name} date={item.date} text={item.text} kom={item.kom} status={item.status} />)}
            </tbody>
        </table>
    )
}
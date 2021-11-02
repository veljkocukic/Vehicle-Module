import React, { useState } from "react"


export const Serviseri = () =>{

    let [openServEdit,setOpenServEdit] = useState(false)
    let dataServ = [{code:"CLIDOM2020243232232", name:"SZR BOKI LIMAR",type:"Farbanje, Limarija", contact:"Bojan Mirković", adr:"Abebe Bikile 4b", tel:"065 2 51 51 60",mail:"info@autolimar.rs",site:"info@autolimar.rs"}]



    const EditServis = () =>{
        return (
        <table className="tg editTable">
                <thead>
                    <th class="tg-0pky">Naziv polja</th>
                    <th class="tg-0pky">Izmena</th>
                </thead>
                <tbody>
                    <tr><td>Šifra klijenta </td><td><input type="text" /></td></tr>
                    <tr><td>Naziv firme </td><td><input type="text" /></td></tr>
                    <tr><td>Tip usluge</td><td><input type="text" /></td></tr>
                    <tr><td>Kontakt</td><td><input type="text" /></td></tr>
                    <tr><td>Broj telefona</td><td><input type="text" /></td></tr>
                    <tr><td>E-mail</td><td><input type="text" /></td></tr>
                    <tr><td>Website</td><td><input type="text" /></td></tr>
                    <tr><td><button onClick={() => setOpenServEdit(false)} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn">Sačuvaj</button></td></tr>
                </tbody>
            </table>)
    }


    const KoloneServiseri = (props) =>{
        return(
            <tr>
            <td>{props.code}</td>
            <td>{props.name}</td>
            <td>{props.type}</td>
            <td>{props.contact}</td>
            <td>{props.adr}</td>
            <td>{props.tel}</td>
            <td>{props.mail}</td>
            <td>{props.site}</td>
            <td><button onClick={()=>setOpenServEdit(true)} >IZMENI</button><button>OBRIŠI</button></td>
            </tr>
        )

    }
    return(
        <table className="tg servt">
            {openServEdit && <EditServis />}
            <thead>
                <tr>
                    <th>Šifra klijenta</th>
                    <th>Naziv firme</th>
                    <th>Tip usluge</th>
                    <th>Kontakt</th>
                    <th>Adresa</th>
                    <th>Br. telefona</th>
                    <th>E-mail</th>
                    <th>Website</th>
                </tr>
            </thead>
            <tbody>
                {dataServ.map((item,key)=> <KoloneServiseri code={item.code} name={item.name} type={item.type} contact={item.contact} adr={item.adr} tel={item.tel} mail={item.mail} site={item.site} key={key}/>)}
            </tbody>
        </table>
    )
}
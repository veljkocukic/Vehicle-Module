import React from "react"
export const Serviseri = () =>{

    let dataServ = [{code:"CLIDOM2020243232232", name:"SZR BOKI LIMAR",type:"Farbanje, Limarija", contact:"Bojan Mirković", adr:"Abebe Bikile 4b", tel:"065 2 51 51 60",mail:"info@autolimar.rs",site:"info@autolimar.rs"}]


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
            <td><button>IZMENI</button><button>OBRIŠI</button></td>
            </tr>
        )

    }
    return(
        <table className="tg servt">
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
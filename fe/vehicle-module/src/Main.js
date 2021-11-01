import React, { useState } from "react";





let vozila = [{ name: "Audi A4", registration: "BG-1009-XP", userType: "Zaposleni", userName: "Tanja Milinkovic", expire: "19.07.2021.", active: "15.07.2016." },
{ name: "Audi A4", registration: "BG-1793-GK", userType: "Zaposleni", userName: "Marko Jovanovic", expire: "20.01.2020.", active: "22.10.2019." }]





export const Main = () => {
    let [editOn,setEditOn] = useState(false)

    const Edit = (props) => {

        let [zaposleni,setZaposleni] = useState(true)
        let handleChange = (e) =>{
            if(e.target.value === "A"){
                setZaposleni(true)
            }else{
                setZaposleni(false)
            }
        }
    
        return(
            <table class="tg editTable">
                <thead>
                    <th class="tg-0pky">Naziv polja</th>
                    <th class="tg-0pky">Izmena</th>
                </thead>
                <tbody>
                    <tr class="editTr"><td>Marka i tip</td><td><input type="text"></input></td></tr>
                    <tr class="editTr"><td>Registracioni broj</td><td><input type="text"></input></td></tr>
                    <tr class="editTr"><td>Tip korisinika</td><td><select onChange={handleChange} ><option value="A">Zaposleni</option><option value="B">Druga lica</option></select></td></tr>
                    <tr class="editTr"><td>Korisnik vozila</td><td>{zaposleni ? "iz baze" : <input type="text"></input>}</td></tr>
                    <tr class="editTr"><td>Isticanje registracije</td><td><input type="date"></input></td></tr>
                    <tr class="editTr"><td>Vozilo aktivno od do</td><td><input type="date"></input></td></tr>
                    <tr><td><button onClick={()=>setEditOn(false)} className="cancelBtn">Otkaži</button></td><td><button className="saveBtn">Sačuvaj</button></td></tr>
                </tbody>
            </table>
        )
    }
    



    const Kolona = (props) => {
        return (
            <tr>
                <td class="tg-0pky">{props.name}</td>
                <td class="tg-0pky">{props.reg}</td>
                <td class="tg-0pky">{props.utype}</td>
                <td class="tg-0pky">{props.uname}</td>
                <td class="tg-0pky">{props.expire}</td>
                <td class="tg-0pky">{props.active}</td>
                <td class="tg-0pky btn"><button onClick={() => setEditOn(true)}>Izmeni</button></td>
            </tr>
        )
    }

    return (
        <div>
            {editOn && <Edit />}
            <div className="tabela">
                <table class="tg">
                    <thead>
                        <tr>
                            <th class="tg-0pky">Marka i tip</th>
                            <th class="tg-0pky">Registracioni broj</th>
                            <th class="tg-0pky">Tip korisinika</th>
                            <th class="tg-0pky">Korisnik vozila</th>
                            <th class="tg-0pky">Isticanje registracije</th>
                            <th class="tg-0pky">Vozilo aktivno od do</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vozila.map((item, key) => <Kolona key={key} name={item.name} reg={item.registration} utype={item.userType} uname={item.userName} expire={item.expire} active={item.active} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
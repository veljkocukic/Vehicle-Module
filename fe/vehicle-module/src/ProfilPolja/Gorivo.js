import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { DataContext } from "../Context"
import { EditGorivo } from "./Editi/EditGorivo"



export const Gorivo = ({ gorivoAr }) => {
    let { formatDate, verDate, form, formaDateEdit, openFuelEdit, setOpenFuelEdit, openSpecEdit, setOpenSpecEdit, id, setId, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, typeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, uslugaOdr, setUslugaOdr, timeOdr, setTimeOdr, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume, valid, setValid, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)




    let fuelData = [{ type: "Gorivo", date: "14.08.2020", km: "143.000", pot: "33,13", cena: "142.53", usluga: "/", time: "/" },
    { type: "Tag", date: "30.08.2020", km: "145.443", pot: "/", cena: "2.500,00", usluga: "Nenad Kljajić", time: "60" }]





    const KoloneGorivo = (props) => {


        return (<tr>
            <td>{props.type}</td>
            <td>{props.date}</td>
            <td>{props.km}</td>
            <td>{props.pot}</td>
            <td>{props.cena}</td>
            <td>{props.usluga}</td>
            <td>{props.time}</td>
            <td><button onClick={() => setOpenFuelEdit(true)}>IZMENI</button> <button>OBRIŠI</button></td>
        </tr>)

    }
    return (
        <table className="tg">
            {openFuelEdit && <EditGorivo />}
            <thead>
                <tr>
                    <th>Tip</th>
                    <th>Datum</th>
                    <th>Kilometraža</th>
                    <th>Potrošnja (l) </th>
                    <th>Cena</th>
                    <th>Usluga zaposlenog</th>
                    <th>Vreme zaposlenog</th>
                </tr>
            </thead>
            <tbody>
                {gorivoAr.map((item, key) => <KoloneGorivo type={item.tip} date={item.datum} km={item.kilometraza} pot={item.potrosnja} cena={item.cena} usluga={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
            </tbody>
        </table>
    )

}
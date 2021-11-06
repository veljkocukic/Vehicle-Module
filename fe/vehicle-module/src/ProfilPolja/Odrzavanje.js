import React, { useState, useEffect, useRef, useContext } from "react"
import { DataContext } from "../Context"
import axios from "axios"
import { EditOdrzavanje } from "./Editi/EditOdrzavanje"

export const Odrzavanje = ({ odrzavanjeAr }) => {
    let dataOdrz = [{ type: "Redovno", date: "14.08.2019", km: "143.000", part: "Ulje, filteri, pločice, akumulator", total: "18.343,00", user: "Nenad Kljajić", time: "160" },
    { type: "Vanredno", date: "16.08.2020", km: "156.343", part: "Zamena klime", total: "56.232,00", user: "Nenad Kljajić", time: "320" }]

    let { openOdrEdit, setOpenOdrEdit, formatDate, verDate, form, formaDateEdit, openFuelEdit, setOpenFuelEdit, openSpecEdit, setOpenSpecEdit, id, setId, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, typeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, uslugaOdr, setUslugaOdr, timeOdr, setTimeOdr, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume, valid, setValid, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)




    const KoloneOdrz = (props) => {

        return (
            <tr>
                <td>{props.type}</td>
                <td>{props.date}</td>
                <td>{props.km}</td>
                <td>{props.part}</td>
                <td>{props.total}</td>
                <td>{props.user}</td>
                <td>{props.time}</td>
                <td><button onClick={() => setOpenOdrEdit(true)}>IZEMNI</button><button>OBRIŠI</button></td>
            </tr>
        )

    }

    return (
        <table className="tg">
            {openOdrEdit && <EditOdrzavanje />}
            <thead>
                <tr>
                    <th>Tip</th>
                    <th>Datum</th>
                    <th>Kilometraža</th>
                    <th>Delovi/Usluga</th>
                    <th>Ukupan trošak</th>
                    <th>Usluga zaposlenog</th>
                    <th>Vreme zaposlenog (min.) </th>
                </tr>
            </thead>
            <tbody>
                {odrzavanjeAr.map((item, key) => <KoloneOdrz type={item.tip} date={item.datum} km={item.kilometraza} part={item.deloviUsluga} total={item.ukupanTrosak} user={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
            </tbody>
        </table>
    )
}
import React, { useState, useRef, useContext, useEffect } from "react"
import axios from "axios"
import { DataContext } from "../Context"
import { EditSteta } from "./Editi/EditSteta"



export const Steta = ({ stetaAr }) => {

    let dataSteta = [{ desc: "Oštećeno levo krilo i branik", cover: "Zaposleni", date: "26.09.2020.", part: "Zamena delova i farbanje", total: "72.546,00", user: "Nenad Kljajić", time: "160" }]
    let { openDmgEdit, setOpenDmgEdit, openOdrEdit, setOpenOdrEdit, formatDate, verDate, form, formaDateEdit, openFuelEdit, setOpenFuelEdit, openSpecEdit, setOpenSpecEdit, id, setId, korisnikMn, setKorisnikMn, aktivnoOd, setAktivnoOd, typeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, uslugaOdr, setUslugaOdr, timeOdr, setTimeOdr, desc, setDesc, pokriva, setPokriva, date, setDate, total, setTotal, usluga, setUsluga, time, setTime, parts, setParts, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume, dateReg, setDateReg, docReg, setDocReg, troskovi, setTroskovi, registrovao, setRegistrovao, timeZaposleni, setTimeZaposleni, regDo, setRegDo } = useContext(DataContext)



    const KoloneSteta = (props) => {
        return (
            <tr>
                <td>{props.desc}</td>
                <td>{props.cover}</td>
                <td>{props.date}</td>
                <td>{props.part}</td>
                <td>{props.total}</td>
                <td>{props.user}</td>
                <td>{props.time}</td>
                <td><button onClick={() => setOpenDmgEdit(true)}>IZEMNI</button><button>OBRIŠI</button></td>
            </tr>
        )
    }


    return (
        <table className="tg">
            {openDmgEdit && <EditSteta />}
            <thead>
                <tr>
                    <th>Opis štete</th>
                    <th>Štetu pokriva</th>
                    <th>Datum</th>
                    <th>Delovi/Usluga</th>
                    <th>Ukupan trošak</th>
                    <th>Usluga zaposlenog</th>
                    <th>Vreme zaposlenog (min.) </th>
                </tr>
            </thead>
            <tbody>
                {stetaAr.map((item, key) => <KoloneSteta desc={item.opisStete} cover={item.stetuPokriva} date={item.datum} part={item.deloviUsluga} total={item.ukupanTrosak} user={item.uslugaZaposlenog} time={item.vremeZaposlenog} key={key} />)}
            </tbody>
        </table>
    )
}
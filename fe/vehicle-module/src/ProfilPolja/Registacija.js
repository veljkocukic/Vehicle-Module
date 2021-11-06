import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { EditRegistracija } from "./Editi/EditRegistracija"



export const Registracija = (
    { setDateReg,
        setDocReg,
        setTroskovi,
        setRegistrovao,
        setRegDo,
        setTimeZaposleni,
        setOpenRegEdit,
        setId,
        id,
        registracijaAr,
        dateReg,
        docReg,
        troskovi,
        registrovao,
        timeZaposleni,
        regDo,
        carId,
        openRegEdit, }) => {




    let formatDate = (dt) => { ///////////// Vreme za tabele
        let date = new Date(dt).toLocaleDateString().replaceAll("/", ".")   ///<------------------------------------- Ne prikazuje nas format
        return date + "."
    }

    let [regId, setRegId] = useState("")


    const handleRegEditOpen = (_id) => {
        setRegId(_id)
        setOpenRegEdit(true)
    }


    const Kolone = (props) => {
        return (
            <tr>
                <td>{formatDate(props.date)}</td>
                <td>{props.doc}</td>
                <td>{props.reg}</td>
                <td>{props.user}</td>
                <td>{props.time}</td>
                <td>{formatDate(props.expire)}</td>
                <td><button onClick={() => handleRegEditOpen(props.kid)}>Izmeni</button><button>Obriši</button></td>
            </tr>
        )
    }

    return (
        <table className="tg">
            {openRegEdit && <EditRegistracija
                setDateReg={setDateReg}
                setDocReg={setDocReg}
                setTroskovi={setTroskovi}
                setRegistrovao={setRegistrovao}
                setRegDo={setRegDo}
                setTimeZaposleni={setTimeZaposleni}
                setOpenRegEdit={setOpenRegEdit}
                setId={setId}
                registracijaAr={registracijaAr}
                docReg={docReg}
                troskovi={troskovi}
                registrovao={registrovao}
                timeZaposleni={timeZaposleni}
                regDo={regDo}
                carId={carId}
                dateReg={dateReg}
                id={id}
                regId={regId} />}

            <thead>
                <tr>
                    <th>Datum registracije</th>
                    <th>Dokumentacija</th>
                    <th>Troškovi registracije</th>
                    <th>Registrovao zaposleni</th>
                    <th>Vreme zaposlenog</th>
                    <th>Registrovan do</th>
                </tr>
            </thead>
            <tbody>
                {registracijaAr.map((item, key) => <Kolone kid={item._id} date={item.datumRegistracije} doc={item.dokumentacija} reg={item.troskoviRegistracije} user={item.registrovaoZaposleni} time={item.vremeZaposlenog} expire={item.registrovanDo} key={key} />)}
            </tbody>
        </table>
    )
}
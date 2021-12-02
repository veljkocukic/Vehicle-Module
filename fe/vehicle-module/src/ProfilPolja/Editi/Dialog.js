import React, { useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "./Spiner"
export const Dialog = ({ par, polje }) => {

    let { setServiseriAr, setOpenDialog, id, spinerOn, setSpinerOn, registracijaAr, setRegistracijaAr, setGorivoAr, setOdrzavanjeAr, setStetaAr } = useContext(DataContext)
    let url = ""

    switch (polje) {
        case "reg":
            url = "registracija/"
            break;
        case "spec":
            url = "specifikacija/"
            break;
        case "fuel":
            url = "gorivo/"
            break;
        case "odr":
            url = "odrzavanje/"
            break;
        case "dmg":
            url = "steta/"
            break;
        case "serv":
            url = "serviseri/"
            break;
        default:
            url = ""
    }

    const handleDelete = async () => {

        setSpinerOn(true)
        await axios.post("https://vehicle-module.herokuapp.com/api/v1/" + url + par, { id }).then(
            () => {
                setSpinerOn(false)
                setOpenDialog(false)
                setRegistracijaAr(prev => prev.filter(item => item._id !== id))
                setOdrzavanjeAr(prev => prev.filter(item => item._id !== id))
                setStetaAr(prev => prev.filter(item => item._id !== id))
                setGorivoAr(prev => prev.filter(item => item._id !== id))
                setServiseriAr(prev => prev.filter(item => item._id !== id))
                console.log(registracijaAr)
                console.log(id)
            }).catch(er => console.log(er))


    }

    return (
        <div className="dialog">
            {spinerOn && <Spiner />}
            <h4>Brisanje</h4>
            <div className="dialog-txt">
                <i className="far fa-question-circle"></i> <p>Da li ste sigurni da želite da obrišete izabranu stavku?</p>
            </div>
            <div className="dialog-btns">
                <button className="dialog-btn dYes" onClick={handleDelete}>Da <i className="fas fa-check"></i></button>
                <button className="dialog-btn dNo" onClick={() => setOpenDialog(false)}>Ne <i className="fas fa-times"></i></button>
            </div>
        </div>
    )
}
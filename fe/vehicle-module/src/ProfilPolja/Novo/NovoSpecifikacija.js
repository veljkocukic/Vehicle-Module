import React, { useContext } from "react"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"


export const NovoSpecifikacija = ({ newC }) => {

    let { spinerOn, setSpinerOn, formatDateEdit, verDate, setOpenSpecEdit, sasija, setSasija, motor, setMotor, godiste, setGodiste, boja, setBoja, dateKup, setDateKup, cenaVoz, setCenaVoz, docume, setDocume } = useContext(DataContext)


    return (
        <div class={newC ? "input-contaier newC" : "input--container"}>
            {spinerOn && <Spiner />}
            <h3 class="input--container__title">Specifikacija</h3>
            <div class={newC ? "from newF" : "form"}>

                <div class="single-input-container">
                    <label for="broj-sasije" class="standard--label">Broj šasije</label>
                    <input type="text" onChange={(e) => setSasija(e.target.value)} class="standard--input" id="broj-sasije" name="broj-sasije" />
                </div>

                <div class="single-input-container">
                    <label for="broj-motora" class="standard--label">Broj motora</label>
                    <input type="text" onChange={e => setMotor(e.target.value)} class="standard--input" id="broj-motora" name="broj-motora" />
                </div>

                <div class="single-input-container">
                    <label for="godiste" class="standard--label">Godište</label>
                    <input type="number" onChange={(e) => setGodiste(e.target.value)} class="standard--input" id="godiste" name="godiste" />
                </div>

                <div class="single-input-container">
                    <label for="boja" class="standard--label">Boja</label>
                    <input onChange={(e) => setBoja(e.target.value)} type="text" class="standard--input" id="boja" name="boja" />

                </div>

                <div class="single-input-container">
                    <label for="datum-kupovine" class="standard--label">Datum kupovine</label>
                    <input onChange={(e) => setDateKup(e.target.value)} type="date" class="standard--input" id="datum-kupovine" name="datum-kupovine" />
                </div>

                <div class="single-input-container">
                    <label for="cena-vozila" class="standard--label">Cena vozila</label>
                    <input onChange={(e) => setCenaVoz(e.target.value)} type="number" class="standard--input" id="cena-vozila" name="cena-vozila" />
                </div>

                <div class="single-input-container">
                    <label for="dokumentacija" class="standard--label">Dokumentacija</label>
                    <textarea onChange={(e) => setDocume(e.target.value)} class="standard--input" id="dokumentacija" name="dokumentacija" />
                </div>
            </div>
        </div>
    )

}
import React, { useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import { useParams } from "react-router-dom"


export const NovoGorivo = ({ newC }) => {
    let { valid, setValid, newOn, setNewOn, spinerOn, setSpinerOn, formatDateEdit, setDateReg, dateReg, verDate, setOpenFuelEdit, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel, id } = useContext(DataContext)


    let { carId } = useParams()

    const handleSubmit = async () => {
        setSpinerOn(true)
        let verifyDateFuel = verDate(dateFuel)
        let verifyKmFuel = kmFuel > 0
        let verifyPotrosnja = (type === "Gorivo" && potrosnja > 5) || type !== "Gorivo"
        let verifyPriceFuel = priceFuel > 100

        if (verifyDateFuel && verifyKmFuel && verifyPotrosnja && verifyPriceFuel) {
            await axios.post("http://localhost:5000/api/v1/gorivo/new/" + carId, { type, dateFuel, kmFuel, potrosnja, priceFuel, uslugaFuel, timeFuel }).then(res => {
                if (res.data !== "success") {
                    alert("error")
                    console.log(res.data)
                    return
                }
                setNewOn(false)
                setValid(true)
                setSpinerOn(false)
                window.location.reload()
            }).catch(er => {
                setSpinerOn(false)
                console.log(er)
                alert(er)
            })
        } else {
            setValid(false)
            setSpinerOn(false)
            console.log(verifyDateFuel, verifyKmFuel, verifyPotrosnja, verifyPriceFuel)

        }
    }


    const handleCancel = () => {
        setType("Gorivo")
        setDateFuel(0)
        setKmFuel("")
        setPotrosnja("")
        setPriceFuel("")
        setUslugaFuel("")
        setTimeFuel("")
        setOpenFuelEdit(false)
        setNewOn(false)
        setValid(true)

    }




    return (
        <div class={newC ? "input-contaier newC" : "input--container"}>
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Gorivo i tekući troškovi</h3>
            <div class={newC ? "from newF" : "form"}>

                <div className="single-input-container">
                    <label for="tip-gorivo" className="standard--label">Tip <span>*</span></label>
                    <select onChange={e => setType(e.target.value)} className="standard--input" id="tip-gorivo" name="tip-gorivo" >
                        <option>Gorivo</option>
                        <option>Tag</option>
                        <option>Pranje</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label for="datum-gorivo" className="standard--label">Datum</label>
                    <input type="date" onChange={(e) => setDateFuel(e.target.value)} className="standard--input" id="datum-gorivo" name="datum-gorivo" />
                </div>

                <div className="single-input-container">
                    <label for="kilometraza-gorivo" className="standard--label">Kilometraža</label>
                    <input type="number" onChange={(e) => setKmFuel(e.target.value)} className="standard--input" id="kilometraza-gorivo" name="kilometraza-gorivo" />
                </div>

                <div className="single-input-container">
                    <label for="potrosnja-gorivo" className="standard--label"> Potrošnja</label>
                    <input onChange={(e) => setPotrosnja(e.target.value)} type="number" className="standard--input" id="potrosnja-gorivo" name="potrosnja-gorivo" />

                </div>

                <div className="single-input-container">
                    <label for="cena-gorivo" className="standard--label">Cena</label>
                    <input onChange={(e) => setPriceFuel(e.target.value)} type="number" className="standard--input" id="cena-gorivo" name="cena-gorivo" />
                </div>

                <div className="single-input-container">
                    <label for="usluga-zaposlenog-gorivo" className="standard--label">Usluga zaposlenog</label>
                    <input onChange={(e) => setUslugaFuel(e.target.value)} type="text" className="standard--input" id="usluga-zaposlenog-gorivo" name="usluga-zaposlenog-gorivo" />
                </div>

                <div className="single-input-container">
                    <label for="vreme-zaposlenog-gorivo" className="standard--label">Vreme zaposlenog</label>
                    <input onChange={(e) => setTimeFuel(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog-gorivo" name="vreme-zaposlenog-gorivo" />
                </div>
            </div>

            {!newC && <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>}

            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </div>
    )

}
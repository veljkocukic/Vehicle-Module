import React, { useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import { useParams } from "react-router-dom"


export const NovoGorivo = ({ newC }) => {
    let { valid, setValid, setNewOn, spinerOn, setSpinerOn, verDate, setOpenFuelEdit, type, setType, dateFuel, setDateFuel, kmFuel, setKmFuel, potrosnja, setPotrosnja, priceFuel, setPriceFuel, uslugaFuel, setUslugaFuel, timeFuel, setTimeFuel } = useContext(DataContext)


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
        <div className={newC ? "input-contaier newC" : "input--container"}>
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Gorivo i tekući troškovi</h3>
            <div className={newC ? "from newF" : "form"}>

                <div className="single-input-container">
                    <label htmlFor="tip-gorivo" className="standard--label">Tip <span>*</span></label>
                    <select onChange={e => setType(e.target.value)} className="standard--input" id="tip-gorivo" name="tip-gorivo" >
                        <option>Gorivo</option>
                        <option>Tag</option>
                        <option>Pranje</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-gorivo" className="standard--label">Datum <span>*</span> </label>
                    <input onBlur={e=>!verDate(e.target.value) ? e.target.style.border="1px solid red" : e.target.style.border="none"} type="date" onChange={(e) => setDateFuel(e.target.value)} className="standard--input" id="datum-gorivo" name="datum-gorivo" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="kilometraza-gorivo" className="standard--label">Kilometraža <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} type="number" onChange={(e) => setKmFuel(e.target.value)} className="standard--input" id="kilometraza-gorivo" name="kilometraza-gorivo" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="potrosnja-gorivo" className="standard--label"> Potrošnja <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} onChange={(e) => setPotrosnja(e.target.value)} type="number" className="standard--input" id="potrosnja-gorivo" name="potrosnja-gorivo" />

                </div>

                <div className="single-input-container">
                    <label htmlFor="cena-gorivo" className="standard--label">Cena <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} onChange={(e) => setPriceFuel(e.target.value)} type="number" className="standard--input" id="cena-gorivo" name="cena-gorivo" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="usluga-zaposlenog-gorivo" className="standard--label">Usluga zaposlenog</label>
                    <input onChange={(e) => setUslugaFuel(e.target.value)} type="text" className="standard--input" id="usluga-zaposlenog-gorivo" name="usluga-zaposlenog-gorivo" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-zaposlenog-gorivo" className="standard--label">Vreme zaposlenog</label>
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
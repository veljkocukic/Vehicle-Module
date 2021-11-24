import React, { useContext } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import { useParams } from "react-router-dom"


export const NovoOdrzavanje = ({ newC }) => {
    let { verDate,valid, setValid, setNewOn, spinerOn, setSpinerOn, typeOdr, uslugaOdr, timeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, setUslugaOdr, setTimeOdr } = useContext(DataContext)


    let { carId } = useParams()

    const handleSubmit = async () => {
        setSpinerOn(true)
        let verifyDateOdr = dateOdr !== 0
        let verifyKmOdr = kmOdr > 10
        let verifyPartsOdr = partsOdr.length > 2
        let verifyTotalOdr = totalOdr > 10

        if (verifyDateOdr && verifyKmOdr && verifyPartsOdr && verifyTotalOdr) {
            await axios.post("http://localhost:5000/api/v1/odrzavanje/new/" + carId, { typeOdr, dateOdr, kmOdr, partsOdr, totalOdr, uslugaOdr, timeOdr }).then(res => {
                if (res.data !== "success") {
                    alert("error")
                    console.log(res.data)
                    return
                }
                setValid(true)
                setSpinerOn(false)
                setNewOn(false)
                window.location.reload()

            }).catch(err => {
                setSpinerOn(false)
                console.log(err)
            })
        } else {
            setSpinerOn(false)
            setValid(false)
            console.log(verifyDateOdr, verifyKmOdr, verifyPartsOdr, verifyTotalOdr)
        }
    }


    const handleCancel = () => {
        setTypeOdr("Redovno")
        setDateOdr(0)
        setKmOdr(0)
        setPartsOdr("")
        setTotalOdr(0)
        setUslugaOdr(0)
        setTimeOdr(0)
        setNewOn(false)
        setValid(true)

    }




    return (
        <div className="input--container">
            {spinerOn && <Spiner />}
            <h3 className="input--container__title">Održavanje</h3>
            <div className={newC ? "from newF" : "form"}>

                <div className="single-input-container">
                    <label htmlFor="tip-odrzavanje" className="standard--label">Tip <span>*</span></label>
                    <select onChange={e => setTypeOdr(e.target.value)} className="standard--input" id="tip-odrzavanje" name="tip-odrzavanje" >
                        <option>Redovno</option>
                        <option>Vanredno</option>
                        <option>Higijena</option>
                        <option>Gume</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-odrzavanje" className="standard--label">Datum <span>*</span></label>
                    <input onBlur={e=> !verDate(e.target.value) ? e.target.style.border="1px solid red" : e.target.style.border="none"} type="date" onChange={(e) => setDateOdr(e.target.value)} className="standard--input" id="datum-odrzavanje" name="datum-odrzavanje" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="kilometraza-odrzavanje" className="standard--label">Kilometraža <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} type="number" onChange={(e) => setKmOdr(e.target.value)} className="standard--input" id="kilometraza-odrzavanje" name="kilometraza-odrzavanje" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="delovi-odrzavanje" className="standard--label"> Delovi/Usluga <span>*</span></label>
                    <input onBlur={e=>e.target.value.length<4 ? e.target.style.border="1px solid red" : e.target.style.border="none"} onChange={(e) => setPartsOdr(e.target.value)} type="text" className="standard--input" id="delovi-odrzavanje" name="delovi-odrzavanje" />

                </div>

                <div className="single-input-container">
                    <label htmlFor="trosak-odrzavanje" className="standard--label">Ukupan trošak <span>*</span></label>
                    <input onBlur={e=>e.target.value===""||e.target.value===0 ? e.target.style.border="1px solid red" : e.target.style.border="none"} onChange={(e) => setTotalOdr(e.target.value)} type="number" className="standard--input" id="trosak-odrzavanje" name="trosak-odrzavanje" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="usluga-zaposlenog-odrzavanje" className="standard--label">Usluga zaposlenog</label>
                    <input onChange={(e) => setUslugaOdr(e.target.value)} type="text" className="standard--input" id="usluga-zaposlenog-gorivo" name="usluga-zaposlenog-gorivo" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="vreme-zaposlenog-odrzavanje" className="standard--label">Vreme zaposlenog</label>
                    <input onChange={(e) => setTimeOdr(e.target.value)} type="text" className="standard--input" id="vreme-zaposlenog-odrzavanje" name="vreme-zaposlenog-odrzavanje" />
                </div>
            </div>

            <div className="input--container__btns">
                <button onClick={handleCancel} className="btn no"><i className="far fa-times-circle"></i> OTKAŽI</button>
                <button className="btn yes" onClick={handleSubmit}><i className="far fa-save"></i> SAČUVAJ</button>
            </div>

            {!valid && <h3 className="nonValid">Uneti podaci nisu validni</h3>}
        </div>
    )

}
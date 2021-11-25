import React, { useContext, useState } from "react"
import axios from "axios"
import { DataContext } from "../../Context"
import { Spiner } from "../Editi/Spiner"
import { useParams } from "react-router-dom"
import { ZaposleniLista } from "./ZaposleniLista"


export const NovoOdrzavanje = ({ newC }) => {
    let { verDate,valid, setValid, setNewOn, spinerOn, setSpinerOn, typeOdr, uslugaOdr, timeOdr, setTypeOdr, dateOdr, setDateOdr, kmOdr, setKmOdr, partsOdr, setPartsOdr, totalOdr, setTotalOdr, setUslugaOdr, setTimeOdr } = useContext(DataContext)


    let { carId } = useParams()
    let [dateFalse,setDateFalse] = useState(false)
    let [kmFalse,setKmFalse] = useState(false)
    let [partsFalse,setPartsFalse] = useState(false)
    let [totalFalse,setTotalFalse] = useState(false)

    const handleSubmit = async () => {
        setSpinerOn(true)
        let verifyDateOdr = dateOdr !== 0
        let verifyKmOdr = kmOdr > 0
        let verifyPartsOdr = partsOdr.length > 4
        let verifyTotalOdr = totalOdr > 0

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
            !verifyDateOdr ? setDateFalse(true) : setDateFalse(false)
            !verifyKmOdr ? setKmFalse(true) : setKmFalse(false)
            !verifyPartsOdr ? setPartsFalse(true) : setPartsFalse(false)
            !verifyTotalOdr ? setTotalFalse(true) : setTotalFalse(false)
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
                    <input style={{border:dateFalse&&"1px solid red"}} onBlur={e=> !verDate(e.target.value) ? setDateFalse(true) : setDateFalse(false)} type="date" onChange={(e) => setDateOdr(e.target.value)} className="standard--input" id="datum-odrzavanje" name="datum-odrzavanje" />
                    { dateFalse && <p style={{color:"red",fontSize:".8em"}}>Datum mora biti validan</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="kilometraza-odrzavanje" className="standard--label">Kilometraža <span>*</span></label>
                    <input style={{border:kmFalse&&"1px solid red"}} onBlur={e=>e.target.value===""||e.target.value===0 ? setKmFalse(true) : setKmFalse(false)} type="number" onChange={(e) => setKmOdr(e.target.value)} className="standard--input" id="kilometraza-odrzavanje" name="kilometraza-odrzavanje" />
                    { kmFalse && <p style={{color:"red",fontSize:".8em"}}>Broj mora biti veći od 0</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="delovi-odrzavanje" className="standard--label"> Delovi/Usluga <span>*</span></label>
                    <input style={{border:partsFalse&&"1px solid red"}} onBlur={e=>e.target.value.length<=4 ? setPartsFalse(true) : setPartsFalse(false)} onChange={(e) => setPartsOdr(e.target.value)} type="text" className="standard--input" id="delovi-odrzavanje" name="delovi-odrzavanje" />
                    { partsFalse && <p style={{color:"red",fontSize:".8em"}}>Unos mora biti veći od 4 karaktera</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="trosak-odrzavanje" className="standard--label">Ukupan trošak <span>*</span></label>
                    <input style={{border:totalFalse&&"1px solid red"}} onBlur={e=>e.target.value==="" || e.target.value===0 ? setTotalFalse(true) : setTotalFalse(false) } onChange={(e) => setTotalOdr(e.target.value)} type="number" className="standard--input" id="trosak-odrzavanje" name="trosak-odrzavanje" />
                    { totalFalse && <p style={{color:"red",fontSize:".8em"}}>Broj mora biti veći od 0</p>}
                </div>

                <div className="single-input-container">
                    <label htmlFor="usluga-zaposlenog-odrzavanje" className="standard--label">Usluga zaposlenog</label>
                    <ZaposleniLista type="odr" />
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

            {!valid && <h3 className="nonValid">Uneti podaci nisu bili validni</h3>}
        </div>
    )

}
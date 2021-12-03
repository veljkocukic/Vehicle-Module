import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { DataContext } from "../Context";
import { Spiner } from "../ProfilPolja/Editi/Spiner"
import { ZaposleniLista } from "../ProfilPolja/Novo/ZaposleniLista";
import { VozilaLista } from "../VozilaLista";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useDispatch } from "react-redux";
import { handleDataTable } from "../state/actions";
import { handleTableHead } from "../state/actions";


export const Menu = ({ sbt }) => {
    let dispatch = useDispatch()
    const [tipIzvestaja, setTipIzvestaja] = useState("Potrošnja goriva")
    const [vrstaVrednosti, setVrstaVrednosti] = useState("Cena (din.)")
    const [rezolucija, setRezolucija] = useState("Godina")
    const [pokriceStete, setPokriceStete] = useState("Zaposleni")
    const [tipTekuceg, setTipTekuceg] = useState("")
    const [tipOdrzavanja, setTipOdrzavanja] = useState("Redovno")
    const [menuDateFrom, setMenuDateFrom] = useState(0)
    const [menuDateTo, setMenuDateTo] = useState(0)
    const [valid, setValid] = useState(true)



    let { setVremeTab,setZaposleniLista, setVozilaLista, vozilaSelect,  spinerOn, setSpinerOn, zaposleniSelect } = useContext(DataContext)

    const vrednostRef = useRef(null)

    useEffect(() => {
        setSpinerOn(true)
        const fetchData1 = async () => {
            await axios.get("http://localhost:5000/api/v1/zaposleni").then(e => {
                setZaposleniLista(e.data)
            })
        }
        const fetchData2 = async () => {
            await axios.get("http://localhost:5000/api/v1/vozila").then(e => {
                setVozilaLista(e.data)
                setSpinerOn(false)
            })
        }
        fetchData1()
        fetchData2()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleTipIzvestaja = (value) => {
        setTipIzvestaja(value)
        setVrstaVrednosti("Cena (din.)")
        vrednostRef.current.value = "Cena (din.)"
    }

    const handleSubmit = async () => {
        if (menuDateFrom !== 0 && menuDateTo !== 0 && menuDateTo > menuDateFrom) {
            setSpinerOn(true)
            tipIzvestaja === "Ukupno vreme zaposlenog" ? setVremeTab(true) : setVremeTab(false)
            let pokr = tipIzvestaja === "Troškovi štete na vozilu" ? pokriceStete : null
            let todr = tipIzvestaja === "Troškovi održavanja" ? tipOdrzavanja : null
            await axios.post("http://localhost:5000/api/v1/izvestaji", { tipIzvestaja, vrstaVrednosti, rezolucija, tipTekuceg, menuDateFrom, menuDateTo, vozilaSelect, zaposleniSelect, pokr, todr }).then(res => {
                dispatch(handleTableHead(res.data.tableHead))
                dispatch(handleDataTable(res.data.dataTable))
                sbt(true)
                setSpinerOn(false)
                setValid(true)

            }).catch(er =>
                console.log("greška: " + er))
        } else {
            setValid(false)
            setSpinerOn(false)

        }



    }


    return (

        <div className="input--container menu-container" >
            {spinerOn && <Spiner />}
            <h2 className="title-menu">Meni za izveštaje</h2>
            <form className="form menuForm">
                <div className="single-input-container">
                    <label htmlFor="tip-izvestaja" className="standard--label">Tip izveštaja <span>*</span></label>
                    <p className="under-text">(odaberite jedan tip izveštaja) </p>
                    <select onChange={e => handleTipIzvestaja(e.target.value)} className="standard--input" id="tip-izvestaja" name="tip-izvestaja" >
                        <option>Potrošnja goriva</option>
                        <option>Troškovi za tag</option>
                        <option>Troškovi za pranje</option>
                        <option>Troškovi registracije</option>
                        <option>Troškovi održavanja </option>
                        <option>Troškovi štete na vozilu </option>
                        <option>Ukupni troškovi</option>
                        <option>Ukupno vreme zaposlenog</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="vrsta-vrednosti" className="standard--label">Vrsta vrednosti <span>*</span></label>
                    <p className="under-text">(odaberite jednu vrstu vrednost) </p>
                    <select ref={vrednostRef} onChange={e => setVrstaVrednosti(e.target.value)} className="standard--input" id="vrsta-vrednosti" name="vrsta-vrednosti" >
                        <option>Cena (din.)</option>
                        {tipIzvestaja === "Potrošnja goriva" && <option>U litrima</option>}
                        <option>Vreme zaposlenog</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="rezolucija" className="standard--label">Rezolucija<span>*</span></label>
                    <p className="under-text">(odaberite rezoluciju) </p>
                    <select onChange={e => setRezolucija(e.target.value)} className="standard--input" id="rezolucija" name="rezolucija" >
                        <option>Godina</option>
                        <option>Pola godine</option>
                        <option>Kvartal</option>
                        <option>Mesec</option>
                        <option>Nedelja</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="pokrice-stete" className="standard--label">Pokriće štete</label>
                    <p className="under-text">(odaberite ko pokriva štetu) </p>
                    <select disabled={tipIzvestaja !== "Troškovi štete na vozilu"} onChange={e => setPokriceStete(e.target.value)} className="standard--input" id="pokrice-stete" name="pokrice-stete" >
                        <option>Zaposleni</option>
                        <option>Firma</option>
                        <option>Drugo lice</option>
                        <option>Osiguranje</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="tekuci-trosak" className="standard--label">Tip tekućeg troška</label>
                    <p className="under-text">(odaberite tip) </p>
                    <select disabled onChange={e => setTipTekuceg(e.target.value)} className="standard--input" id="tekuci-trosak" name="tekuci-trosak" >
                        <option>Gorivo</option>
                        <option>Tag</option>
                        <option>Pranje</option>
                    </select>
                </div>

                <div className="single-input-container">
                    <label htmlFor="tip-odrzavanja" className="standard--label">Tip održavanja</label>
                    <p className="under-text">(odaberite tip) </p>
                    <select disabled={tipIzvestaja !== "Troškovi održavanja"} onChange={e => setTipOdrzavanja(e.target.value)} className="standard--input" id="tip-odrzavanja" name="tip-odrzavanja" >
                        <option>Redovno</option>
                        <option>Vanredno</option>
                        <option>Higijena</option>
                        <option>Gume</option>
                    </select>
                </div>

                <div className="single-input-container multiple-select">
                    <label htmlFor="vozila" className="standard--label">Vozila</label>
                    <p className="under-text">(odaberite jedno ili više vozila) </p>
                    <VozilaLista />
                </div>

                <div className="single-input-container multiple-select">
                    <label htmlFor="tip-odrzavanja" className="standard--label">Zaposleni</label>
                    <p className="under-text">(odaberite jednog ili više zaposlenih) </p>
                    <ZaposleniLista multiple />
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-od" className="standard--label">Datum od<span>*</span></label>
                    <input onChange={e => setMenuDateFrom(e.target.value)} type="date" className="standard--input" id="datum-od" name="datum-od" />
                </div>

                <div className="single-input-container">
                    <label htmlFor="datum-do" className="standard--label">Datum do<span>*</span></label>
                    <input onChange={e => setMenuDateTo(e.target.value)} type="date" className="standard--input" id="datum-do" name="datum-do" />
                </div>

            </form>

            <div className="input--container__btns">
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn no menu-excell"
                    table="excel-table"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="EXPORT U EXCELL" />
                <button className="btn yes menu-create" onClick={handleSubmit} ><i className="far fa-file-alt menu-icon"></i> KREIRAJ IZVEŠTAJ</button>
            </div>


            {!valid && <h3 className="nonValid">Uneti datumi nisu validni</h3>}
        </div>




    )
}
import React,{useState,useEffect,useRef,useContext} from "react"
import axios from "axios"
import { DataContext } from "../Context";
import {Spiner} from "../ProfilPolja/Editi/Spiner"
import { ZaposleniLista } from "../ProfilPolja/Novo/ZaposleniLista";
import { VozilaLista } from "../VozilaLista";

export const Menu = () =>{
const [tipIzvestaja,setTipIzvestaja] = useState("")
const [vrstaVrednost,setVrstaVrednosti] = useState("")
const [rezolucija,setRezolucija] = useState("")
const [pokriceStete,setPokriceStete] = useState("")
const [tipTekuceg,setTipTekuceg] = useState("")
const [tipOdrzavanja,setTipOdrzavanja] = useState("")
const [menuDateFrom,setMenuDateFrom] = useState("")
const [menuDateTo,setMenuDateTo] = useState("")



let {setZaposleniLista,zaposleniLista,setVozilaLista,vozilaSelect,voz,spinerOn,setSpinerOn} = useContext(DataContext)
const multi = useRef(null)

    useEffect(()=>{
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
    },[])

    return(

            <div className="input--container menu-container" >
                {spinerOn && <Spiner />}
                <h2 className="title-menu">Meni za izveštaje</h2>
                <form className="form menuForm">
                    <div className="single-input-container">
                        <label for="tip-izvestaja" className="standard--label">Tip izveštaja <span>*</span></label>
                        <p class="under-text">(odaberite jedan tip izveštaja) </p>
                        <select onChange={e=>setTipIzvestaja(e.target.value)}className="standard--input" id="tip-izvestaja" name="tip-izvestaja" >
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
                        <label for="vrsta-vrednosti" className="standard--label">Vrsta vrednosti <span>*</span></label>
                        <p class="under-text">(odaberite jednu vrstu vrednost) </p>
                        <select onChange={e=>setVrstaVrednosti(e.target.value)} className="standard--input" id="vrsta-vrednosti" name="vrsta-vrednosti" >
                            <option>Cena (din.)</option>
                            <option>U litrima</option>
                            <option>Vreme zaposlenog</option>
                        </select>
                    </div>

                    <div className="single-input-container">
                        <label for="rezolucija" className="standard--label">Rezolucija<span>*</span></label>
                        <p class="under-text">(odaberite rezoluciju) </p>
                        <select onChange={setRezolucija} className="standard--input" id="rezolucija" name="rezolucija" >
                            <option>Godina</option>
                            <option>Pola godine</option>
                            <option>Kvartal</option>
                            <option>Mesec</option>
                            <option>Nedelja</option>
                        </select>
                    </div>

                    <div className="single-input-container">
                        <label for="pokrice-stete" className="standard--label">Pokriće štete</label>
                        <p class="under-text">(odaberite ko pokriva štetu) </p>
                        <select onChange={e=>setPokriceStete(e.target.value)} className="standard--input" id="pokrice-stete" name="pokrice-stete" >
                            <option>Zaoposleni</option>
                            <option>Firma</option>
                            <option>Drugo lice</option>
                            <option>Osiguranje</option>
                        </select>
                    </div>

                    <div className="single-input-container">
                        <label for="tekuci-trosak" className="standard--label">Tip tekućeg troška</label>
                        <p class="under-text">(odaberite tip) </p>
                        <select onChange={e=>setTipTekuceg(e.target.value)} className="standard--input" id="tekuci-trosak" name="tekuci-trosak" >
                            <option>Gorivo</option>
                            <option>Tag</option>
                            <option>Pranje</option>
                        </select>
                    </div>

                    <div className="single-input-container">
                        <label for="tip-odrzavanja" className="standard--label">Tip održavanja</label>
                        <p class="under-text">(odaberite tip) </p>
                        <select onChange={e=>setTipOdrzavanja(e.target.value)} className="standard--input" id="tip-odrzavanja" name="tip-odrzavanja" >
                            <option>Redovno</option>
                            <option>Vanredno</option>
                            <option>Higijena</option>
                            <option>Gume</option>
                        </select>
                    </div>

                    <div className="single-input-container multiple-select">
                        <label for="vozila" className="standard--label">Vozila</label>
                        <p class="under-text">(odaberite jedno ili više vozila) </p>
                        <VozilaLista />
                    </div>

                    <div className="single-input-container multiple-select">
                        <label for="tip-odrzavanja" className="standard--label">Zaposleni</label>
                        <p class="under-text">(odaberite jednog ili više zaposlenih) </p>
                        <ZaposleniLista multiple />
                    </div>

                    <div className="single-input-container">
                        <label for="datum-od" className="standard--label">Datum od<span>*</span></label>
                        <input onChange={e=>setMenuDateFrom(e.target.value)} type="date" className="standard--input" id="datum-od" name="datum-od" />
                    </div>

                    <div className="single-input-container">
                        <label for="datum-do" className="standard--label">Datum do<span>*</span></label>
                        <input onChange={e=>setMenuDateTo(e.target.value)} type="date" className="standard--input" id="datum-do" name="datum-do" />
                    </div>

                </form>

                <div className="input--container__btns">
                    <button className="btn no menu-excell" ><i class="far fa-file-excel menu-icon"></i> EXPORT U EXCELL</button>
                    <button className="btn yes menu-create" ><i class="far fa-file-alt menu-icon"></i> KREIRAJ IZVEŠTAJ</button>
                </div>

            </div>


            

    )
}
import React from "react";
import "./style/izvestaj.css"
import { Link } from "react-router-dom";
export const Izvestaj = () => {
    return (
        <div className="izvestaj">
            <div className="page-title">
                <h1>Izveštaji</h1>
            </div>
            <div className="input--container menu-container" >
                <h2 className="title-menu">Meni za izveštaje</h2>
                <form className="form menuForm">
                    <div className="single-input-container">
                        <label for="tip-izvestaja" className="standard--label">Tip izveštaja <span>*</span></label>
                        <p class="under-text">(odaberite jedan tip izveštaja) </p>
                        <select className="standard--input" id="tip-izvestaja" name="tip-izvestaja" >
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
                        <select className="standard--input" id="vrsta-vrednosti" name="vrsta-vrednosti" >
                            <option>Cena (din.)</option>
                            <option>U litrima</option>
                            <option>Vreme zaposlenog</option>
                        </select>
                    </div>

                    <div className="single-input-container">
                        <label for="rezolucija" className="standard--label">Rezolucija<span>*</span></label>
                        <p class="under-text">(odaberite rezoluciju) </p>
                        <select className="standard--input" id="rezolucija" name="rezolucija" >
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
                        <select className="standard--input" id="pokrice-stete" name="pokrice-stete" >
                            <option>Zaoposleni</option>
                            <option>Firma</option>
                            <option>Drugo lice</option>
                            <option>Osiguranje</option>
                        </select>
                    </div>

                    <div className="single-input-container">
                        <label for="vozila" className="standard--label">Vozila</label>
                        <p class="under-text">(odaberite jedno ili više vozila) </p>
                        <select className="standard--input" id="vozila" name="vozila" >
                            <option>Zaoposleni</option>
                            <option>Firma</option>
                            <option>Drugo lice</option>
                            <option>Osiguranje</option>
                        </select>
                    </div>

                    <div className="single-input-container">
                        <label for="tekuci-trosak" className="standard--label">Tip tekućeg troška</label>
                        <p class="under-text">(odaberite tip) </p>
                        <select className="standard--input" id="tekuci-trosak" name="tekuci-trosak" >
                            <option>Gorivo</option>
                            <option>Tag</option>
                            <option>Pranje</option>
                        </select>
                    </div>

                    <div className="single-input-container">
                        <label for="tip-odrzavanja" className="standard--label">Tip održavanja</label>
                        <p class="under-text">(odaberite tip) </p>
                        <select className="standard--input" id="tip-odrzavanja" name="tip-odrzavanja" >
                            <option>Redovno</option>
                            <option>Vanredno</option>
                            <option>Higijena</option>
                            <option>Gume</option>
                        </select>
                    </div>

                    <div className="single-input-container">
                        <label for="tip-odrzavanja" className="standard--label">Zaposleni</label>
                        <p class="under-text">(odaberite jednog ili više zaposlenih) </p>
                        <select className="standard--input" id="tip-odrzavanja" name="tip-odrzavanja" >
                            <option>Redovno</option>
                            <option>Vanredno</option>
                            <option>Higijena</option>
                            <option>Gume</option>
                        </select>
                    </div>

                    <div className="single-input-container">
                        <label for="datum-od" className="standard--label">Datum od<span>*</span></label>
                        <p class="under-text"> {"\n"} </p>
                        <input type="date" className="standard--input" id="datum-od" name="datum-od" />
                    </div>

                    <div className="single-input-container">
                        <label for="datum-do" className="standard--label">Datum do<span>*</span></label>
                        <p class="under-text"> </p>
                        <input type="date" className="standard--input" id="datum-do" name="datum-do" />
                    </div>

                </form>

                <div className="input--container__btns">
                    <button className="btn no menu-excell"><i class="far fa-file-excel menu-icon"></i> EXPORT U EXCELL</button>
                    <button className="btn yes menu-create" ><i class="far fa-file-alt menu-icon"></i> KREIRAJ IZVEŠTAJ</button>
                </div>

            </div>
        </div>

    )
}
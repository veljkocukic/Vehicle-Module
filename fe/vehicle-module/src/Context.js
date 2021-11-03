import React, { createContext, useState,useRef } from "react";

export let DataContext = createContext();
export let DataProvider = (props) => {

    let [marka,setMarka] = useState("")
    let [regBr,setRegBr] = useState(0)
    let [typeMn,setTypeMn] = useState("Zaposleni")
    let [korisnikMn,setKorisnikMn] = useState("")
    let [isticanje,setIsticanje] = useState(0)
    let [aktivnoOd,setAktivnoOd] = useState(0)

    
    let markaRef = useRef(null)
    let regBrRef = useRef(null)
    let tipKorRef = useRef(null)
    let korVozRef = useRef(null)
    let isticRef = useRef(null)
    let activeRef = useRef(null)

  return (
    <DataContext.Provider
      value={{marka,setMarka,regBr,setRegBr,typeMn,setTypeMn,korisnikMn,setKorisnikMn,isticanje,setIsticanje,aktivnoOd,setAktivnoOd,markaRef,regBrRef,tipKorRef,korVozRef,isticRef,activeRef }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
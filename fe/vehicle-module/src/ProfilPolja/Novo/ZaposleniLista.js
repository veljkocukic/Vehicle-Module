import React,{useContext, useRef} from "react"
import { DataContext } from "../../Context"

export const ZaposleniLista = (props) => {
    let multi = useRef(null)
    let {setZaposleniLista,zaposleniLista,setKorisnikMn,setZaposleniSelect,setRegistrovao,setUslugaFuel,setUslugaOdr,setUsluga} = useContext(DataContext)
    const handleC = (e) => {

        if(props.multiple){
            setZaposleniSelect([...multi.current.options].filter(option => option.selected).map(option => option.value))
        }else if(props.type==="reg"){
            setRegistrovao(e.target.value)
        }else if(props.type==="gor"){
            setUslugaFuel(e.target.value)
        }else if(props.type==="odr"){
            setUslugaOdr(e.target.value)
        }else if(props.type="dmg"){
            setUsluga(e.target.value)
        }else{
            setKorisnikMn(e.target.value)
        }
    }

   

    return (
        <select ref={props.rf || multi} multiple={props.multiple && true} className={props.multiple && "multiple-area"} onChange={(e) => handleC(e)}>
            {(props.type === "gor" || props.type==="odr" || props.type==="dmg")&&<option value=""></option>}
            {zaposleniLista.map((item,key) => <option value={item.ime} key={key} >{item.ime}</option>)}
        </select>
    )
}
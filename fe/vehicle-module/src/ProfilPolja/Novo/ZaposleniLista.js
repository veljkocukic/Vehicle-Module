import React,{useContext, useRef} from "react"
import { DataContext } from "../../Context"

export const ZaposleniLista = (props) => {
    let multi = useRef(null)
    let {zaposleniLista,setKorisnikMn,setZaposleniSelect} = useContext(DataContext)
    const handleC = (e) => {
        let select = multi.current

        if(props.multiple){
            setZaposleniSelect([...select.options].filter(option => option.selected).map(option => option.value))
        }else{
            setKorisnikMn(e.target.value)
        }


    }

    return (
        <select ref={multi} multiple={props.multiple && true} className={props.multiple && "multiple-area"} onChange={(e) => handleC(e)}>
            {zaposleniLista.map((item,key) => <option value={item.ime} key={key} >{item.ime}</option>)}
        </select>
    )
}
import React,{useContext} from "react"
import { DataContext } from "../../Context"

export const ZaposleniLista = () => {
    let {zaposleniLista,setKorisnikMn} = useContext(DataContext)
    const handleC = (e) => {
        setKorisnikMn(e.target.value)

    }

    return (
        <select onChange={(e) => handleC(e)}>
            {zaposleniLista.map(item => <option value={item.ime}>{item.ime}</option>)}
        </select>
    )
}
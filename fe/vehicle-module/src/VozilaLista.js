import React,{useContext,useRef} from "react";
import { DataContext } from "./Context";
export const VozilaLista = () =>{


    let multi = useRef(null)

    let {setVozilaSelect,vozilaLista} = useContext(DataContext)
    const handleC = (e) => {
        let select = multi.current
        setVozilaSelect([...select.options].filter(option => option.selected).map(option => option.value))
    }


    return(
    <select ref={multi} multiple className="multiple-area" onChange={(e) => handleC(e)}>
        {vozilaLista.map(item => <option value={item.name} id={item.id}>{item.name}</option>)}
    </select>
)
}
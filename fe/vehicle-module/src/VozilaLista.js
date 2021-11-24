import React,{useContext,useRef} from "react";
import { DataContext } from "./Context";
export const VozilaLista = () =>{


    let multi = useRef(null)

    let {setVozilaSelect,vozilaLista,vozilaSelect} = useContext(DataContext)
    const handleC = (e) => {
        let select = multi.current
        setVozilaSelect([...select.options].filter(option => option.selected).map(option => option.value))
        console.log(vozilaSelect)
    }


    return(
    <select ref={multi} multiple className="multiple-area" onChange={(e) => handleC(e)}>
        {vozilaLista.map((item,key) => <option value={item._id} id={item._id} key={key} >{item.name}</option>)}
    </select>
)
}
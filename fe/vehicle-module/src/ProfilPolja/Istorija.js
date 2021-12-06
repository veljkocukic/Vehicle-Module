import React from "react"


export const Istorija = ({istorijaAr}) => {

    const istorijaFormat = (dt) =>{
        let date = new Date(dt)
        return date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+". "+(date.getHours()-1)+":"+date.getMinutes()+":"+date.getSeconds()
    }

    const KoloneIst = (props) => {
        return (
            <tr>
                <td>{props.name}</td>
                <td>{istorijaFormat(props.time)}</td>
                <td>{props.chan}</td>
            </tr>
        )
    }

    return (
        <table className="tg">
            <thead>
                <tr>
                    <th colSpan="3" >Istorija</th>
                </tr>
                <tr className="head-table">
                    <th>Operater</th>
                    <th>Izmena</th>
                    <th>Promena kreirana</th>
                </tr>
            </thead>
            <tbody>
                {istorijaAr.map((item, key) => <KoloneIst name={item.operater} time={item.promenaKreirana} chan={item.izmena} key={key} />) || ""}
            </tbody>
        </table>
    )
}
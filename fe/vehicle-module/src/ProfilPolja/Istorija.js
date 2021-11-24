import React from "react"


export const Istorija = () => {

    let dataIst = [{ name: "Nenad Kljajić", chan: "Dodata nova registracija", time: "26.09.2020 10:12:33" }, { name: "Nenad Kljajić", chan: "Izmena tekućeg troška gorivo iz 27,650 din. u 28,360 din.", time: "27.09.2020 11:22:33" }]

    const KoloneIst = (props) => {
        return (
            <tr>
                <td>{props.name}</td>
                <td>{props.time}</td>
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
                {dataIst.map((item, key) => <KoloneIst name={item.name} time={item.time} chan={item.chan} key={key} />)}
            </tbody>
        </table>
    )
}
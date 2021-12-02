import React, { useState } from "react"
import "./style/paginacija.css"

export const Paginacija = (props) => {
  let [current, setCurrent] = useState(1)
  let total = props.arr.length
  let setSl = n => {
    setCurrent(n)
    props.setSliceAr(props.arr.slice(n * 5 - 5, n * 5))
  }


  let handleChev = (n) => {
    let fn = n > 0 ? current + 1 : current - 1
    setCurrent(fn)
    props.setSliceAr(props.arr.slice(fn * 5 - 5, fn * 5))
  }


  const rednderBtns = () => {
    let currentNotLast = current !== Math.ceil(total / 5)
    let cond = n => currentNotLast && n < Math.ceil(total / 5)



    return (
      <>

        <div className="pag-item" onClick={(e) => setSl(e.target.innerText)} >{current}</div>
        {currentNotLast && <div onClick={(e) => setSl(e.target.innerText)} className="pag-item">{parseInt(current) + 1}</div>}
        {cond(current + 2) && <div onClick={(e) => setSl(e.target.innerText)} className="pag-item">{parseInt(current) + 2}</div>}


      </>)

  }

  return (
    <div className="pagination">

      <div onClick={(e) => current > 1 && handleChev(0)} className="pag-item prev">{"<"}</div>


      {current > 1 && <div onClick={e => setSl(e.target.innerText)} className="pag-item">1</div>}
      {rednderBtns()}


      <div onClick={(e) => current < Math.ceil(total / 5) && handleChev(1)} className="pag-item next">{">"}</div>

    </div>
  );
}
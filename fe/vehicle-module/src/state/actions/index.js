export const handleBroj = (p) => {
    return { payload: p, type: "BROJ" }
}

export const handleIme = (ime) => {
    return { payload: ime, type: "IME" }
}
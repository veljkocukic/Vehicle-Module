export const handleBroj = (p) => {
    return { payload: p, type: "BROJ" }
}

export const handleIme = (ime) => {
    return { payload: ime, type: "IME" }
}

export const handleSmallTableOn = (arg) => {
    return {
        type: arg ? "ON" : "OFF"
    }
}

export const handleDataSmall = arg =>{
    return{
        type:"DATASMALL",payload:arg
    }
}

export const handleDataTable = arg =>{
    return{
        type:"DATATABLE",payload:arg
    }
}

export const handleTableHead = arg =>{
    return{
        type:"TABLEHEAD",payload:arg
    }
}

export const handleUserName = arg =>{
    return{
        type:"LOGINNAME",payload:arg
    }
}
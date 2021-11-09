let { CarsModel, ServiseriModel, CommentsModel, ZaposleniModel } = require("../Modeli/Podaci")

function form(e) {
    if (e < 10) {
        let arr = []
        arr.push(e.toString())
        arr.unshift(0)
        arr = arr.join("")
        return arr
    }
    return e
}

let formatDate = (dt) => { ///////////// Vreme za tabele
    let date = new Date(dt).toLocaleDateString().replaceAll("/", ".")   ///<------------------------------------- Ne prikazuje nas format
    return date + "."
}

let formatDateEdit = (dt) => { ////////////////////// Vreme za unos
    let t = new Date(dt)
    let month = form(t.getMonth() + 1)
    let day = form(t.getDate())
    return `${t.getFullYear()}-${month}-${day}`
}


const NovoRegistracija = async(req,res)=>{
    try {
        const registracija = await CarsModel.findById(req.params.carId)
        
        
        let newR =  {       
            datumRegistracije :req.body.dateReg,
            dokumentacija: req.body.docReg,
            troskoviRegistracije :req.body.troskovi,
            registrovaoZaposleni: req.body.registrovao,
            vremeZaposlenog: req.body.timeZaposleni,
            registrovanDo :req.body.regDo}
            registracija.registracijaPolje.push(newR)
            registracija.save()
            res.send("success")
            


    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


module.exports={NovoRegistracija}
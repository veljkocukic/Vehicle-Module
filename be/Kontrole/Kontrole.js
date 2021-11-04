let {CarsModel,ServiseriModel,CommentsModel,ZaposleniModel} = require("../Modeli/Podaci")




function form(e){
    if(e<10){
    let arr=[]
    arr.push(e.toString())
    arr.unshift(0)
    arr=arr.join("")
    return arr} 
    return e
}


let formatDate = (dt)=>{ ///////////// Vreme za tabele
    let date =  new Date(dt).toLocaleDateString().replaceAll("/",".")   ///<------------------------------------- Ne prikazuje nas format
    return date+"."
}
let formatDateEdit = (dt) =>{ ////////////////////// Vreme za unos
    let t = new Date(dt)
    let month = form(t.getMonth()+1)
    let day = form(t.getDate())
    return `${t.getFullYear()}-${month}-${day}`
}

const Main = async(req,res)=>{ ////Podaci za listu automobila na glavnoj strani
    try {
        const vozila = await CarsModel.find({})
        let arr = []
        for(let a of vozila){
            arr.push({
                id:a._id,
                markaTip:a.markaTip,
                regBroj:a.registracioniBroj,
                korisnikVozila:a.korisnikVoz,
                isticanje:formatDate(a.registrovanDo),
                activeFrom:formatDate(a.activeFrom),
                isticanjeEdit:formatDateEdit(a.registrovanDo),
                activeFromEdit:formatDateEdit(a.activeFrom),
                tipKorisnika:a.tipKorisnika
            })
        }
        res.json(arr)
        
    } catch (error) {
        console.log(error)
    }
}


const Zaposleni = async(req,res)=>{ //////////////////Lista svih zaposlenih i podaci o njima
    try {
        const zaposleni = await ZaposleniModel.find({})
        res.send(zaposleni)
    } catch (error) {
        console.log(error)
    }
}



const EditCars = async(req,res)=>{
    try {

        const car = await CarsModel.findById(req.body.id)
        car.markaTip=req.body.marka
        car.registracioniBroj=req.body.regBr
        car.tipKorisnika = req.body.typeMn
        car.korisnikVoz = req.body.korisnikMn
        car.registrovanDo = req.body.isticanje
        car.activeFrom = req.body.aktivnoOd
        car.save()
        res.send("success")
        

    } catch (error) {
        console.log(error)
    }
}

const SingleCar = async(req,res) =>{


    try {
        const car = await CarsModel.findById(req.params.carId)
        res.json({
        car        
        })
    } catch (err) {
        console.log(err)
    }

}


const RegistracijaEdit = async(req,res) =>{




    
    try {
        
        const registracija = await CarsModel.findById(req.params.carId)
        let reg = registracija.registracijaPolje.find(item=>item._id===req.body.id)
        registracija.reg.datumRegistracije=req.body.dateReg
        registracija.reg.dokumentacija=req.body.docReg
        registracija.reg.troskoviRegistracije=req.body.troskovi
        registracija.reg.registrovaoZaposleni=req.body.registrovao
        registracija.reg.vremeZaposlenog=req.body.timeZaposleni
        registracija.reg.registrovanDo=req.body.regDo

        registracija.save()
        res.send("success")

    } catch (error) {
        console.log(error)
    }
}


module.exports = {Main,Zaposleni,EditCars,SingleCar,RegistracijaEdit}
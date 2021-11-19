let { CarsModel, ServiseriModel, CommentsModel, ZaposleniModel } = require("../Modeli/Podaci")
let mongoose = require("mongoose")



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
    let date = new Date(dt)
    return  date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+"."
}

let formatDateEdit = (dt) => { ////////////////////// Vreme za unos
    let t = new Date(dt)
    let month = form(t.getMonth() + 1)
    let day = form(t.getDate())
    return `${t.getFullYear()}-${month}-${day}`
}


const Main = async (req, res) => { ////Podaci za listu automobila na glavnoj strani
    try {
        const vozila = await CarsModel.find({})
        let arr = []
        for (let a of vozila) {
            let isticanje
            let isticanjeEdit
            try {
                isticanje = formatDate(a.registracijaPolje[a.registracijaPolje.length - 1].registrovanDo)
                isticanjeEdit = formatDateEdit(a.registracijaPolje[a.registracijaPolje.length - 1].registrovanDo)
            } catch (error) {
                isticanje = ""
                isticanjeEdit = ""
            }


            arr.push({
                id: a._id,
                markaTip: a.markaTip,
                regBroj: a.registracioniBroj,
                korisnikVozila: a.korisnikVoz,
                activeFrom: formatDate(a.activeFrom),
                activeFromEdit: formatDateEdit(a.activeFrom),
                tipKorisnika: a.tipKorisnika,
                activeTo: new Date(a.activeTo).getFullYear()!==1970 ? formatDate(a.activeTo) : "",
                activeToEdit: new Date(a.activeTo).getFullYear()!==1970 ? formatDateEdit(a.activeTo) : "",
                isticanje,
                isticanjeEdit,
                slike: a.slike
            })
        }
        res.json(arr)

    } catch (error) {
        console.log(error)
        res.send(error)

    }
}


const Zaposleni = async (req, res) => { //////////////////Lista svih zaposlenih i podaci o njima
    try {
        const zaposleni = await ZaposleniModel.find({})
        res.send(zaposleni)
    } catch (error) {
        console.log(error)
        res.send(error)

    }
}



const EditCars = async (req, res) => {
    try {

        const car = await CarsModel.findById(req.body.id)
        car.markaTip = req.body.marka
        car.registracioniBroj = req.body.regBr
        car.tipKorisnika = req.body.typeMn
        car.korisnikVoz = req.body.korisnikMn
        car.registrovanDo = req.body.isticanje
        car.activeFrom = req.body.aktivnoOd
        car.activeTo = req.body.aktivnoDo
        car.save()
        res.send("success")


    } catch (error) {
        console.log(error)
        res.send(error)

    }
}

const SingleCar = async (req, res) => {


    try {
        const car = await CarsModel.findById(req.params.carId)
        res.json({
            car
        })
    } catch (error) {
        console.log(error)
        res.send(error)

    }

}


const RegistracijaEdit = async (req, res) => {
    const registracija = await CarsModel.findById(req.params.carId)
    let reg = registracija.registracijaPolje[0]._id
    try {
        const registracija = await CarsModel.findById(req.params.carId)
        let reg = registracija.registracijaPolje.find(item => item._id.toString() === req.body.id)
        reg.datumRegistracije = req.body.dateReg
        reg.dokumentacija = req.body.docReg
        reg.troskoviRegistracije = req.body.troskovi
        reg.registrovaoZaposleni = req.body.registrovao
        reg.vremeZaposlenog = req.body.timeZaposleni
        reg.registrovanDo = req.body.regDo

        registracija.save()
        res.send("success")

    } catch (error) {
        console.log(error)
        console.log(req.body)

        console.log(reg)
        res.send(error)
    }
}

const SpecifikacijaEdit = async (req, res) => {
    try {
        const specifikacija = await CarsModel.findById(req.params.carId)

        specifikacija.specifikacijaPolje.brSasije = req.body.sasija
        specifikacija.specifikacijaPolje.brMotora = req.body.motor
        specifikacija.specifikacijaPolje.godiste = req.body.godiste
        specifikacija.specifikacijaPolje.boja = req.body.boja
        specifikacija.specifikacijaPolje.datumKupovine = req.body.dateKup
        specifikacija.specifikacijaPolje.cenaVozila = req.body.cenaVoz
        specifikacija.specifikacijaPolje.dokumentacija = req.body.docume

        specifikacija.save()
        res.send("success")



    } catch (error) {
        console.log(error)
        res.send(error)

    }
}


const GorivoEdit = async (req, res) => {

    try {
        const gorivo = await CarsModel.findById(req.params.carId)
        let gor = gorivo.gorivoPolje.find(item => item._id.toString() === req.body.id)

        gor.tip = req.body.type
        gor.datum = req.body.dateFuel
        gor.kilometraza = req.body.kmFuel
        gor.potrosnja = req.body.potrosnja
        gor.cena = req.body.priceFuel
        gor.uslugaZaposlenog = req.body.uslugaFuel
        gor.vremeZaposlenog = req.body.timeFuel
        gorivo.save()
        res.send("success")



    } catch (error) {
        console.log(error)
        res.send(error)

    }
}


const OdrzavanjeEdit = async (req, res) => {

    try {
        let odrzavanje = await CarsModel.findById(req.params.carId)
        let odr = odrzavanje.odrzavanjePolje.find(item => item._id.toString() === req.body.id)

        odr.tip = req.body.typeOdr
        odr.datum = req.body.dateOdr
        odr.kilometraza = req.body.kmOdr
        odr.deloviUsluga = req.body.partsOdr
        odr.ukupanTrosak = req.body.totalOdr
        odr.uslugaZaposlenog = req.body.uslugaOdr
        odr.vremeZaposlenog = req.body.timeOdr

        odrzavanje.save()
        res.send("success")


    } catch (error) {
        console.log(error)
        res.send(error)

    }

}


const StetaEdit = async (req, res) => {

    try {

        let steta = await CarsModel.findById(req.params.carId)
        let ste = steta.stetaPolje.find(item => item._id.toString() === req.body.id)

        ste.opisStete = req.body.desc
        ste.stetuPokriva = req.body.pokriva
        ste.datum = req.body.date
        ste.deloviUsluga = req.body.parts
        ste.ukupanTrosak = req.body.total
        ste.uslugaZaposlenog = req.body.usluga
        ste.vremeZaposlenog = req.body.time

        steta.save()
        res.send(req.body)

    } catch (error) {
        console.log(error)
    }

}


const Serviseri = async (req, res) => {

    try {

        let serviseri = await ServiseriModel.find({})
        res.send(serviseri)

    } catch (error) {
        console.log(error)
    }

}

const ServiseriEdit = async (req, res) => {

    try {
        const serv = await ServiseriModel.findById(req.body.id)


        serv.sifraKlijenta = req.body.sifraS
        serv.nazivFirme = req.body.nazivFirme
        serv.tipUsluge = req.body.tipUslugeS
        serv.kontakt = req.body.kontaktS
        serv.adresa = req.body.adresaS
        serv.brTelefona = req.body.telS
        serv.email = req.body.mailS
        serv.website = req.body.siteS

        serv.save()
        res.send("success")



    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const Vozila = async (req,res) =>{
    try {
        const vozila = await CarsModel.find({})
        let newAr = []
        for(a of vozila){
            newAr.push( {name:a.markaTip,_id:a._id})
        }
        res.send(newAr)

    } catch (error) {
        console.log(error)
    }
}

const IzvestajiPost = async(req,res) =>{
    try {
            let ar = []
        
            for(let a of req.body.vozilaSelect){
                ar.push(mongoose.Types.ObjectId(a))
            }
            let all = await CarsModel.find({_id:ar})

            let results = []
            let num = 0
            let meseci = razlika(req.body.menuDateFrom,req.body.menuDateTo)
            let startMonth = new Date(req.body.menuDateFrom).getMonth()+1
            let headAr = []

            function razlika(datumOd,datumDo){
                let t2=new Date(datumDo)
                let t1=new Date(datumOd)
                
                let mnt1 = (t1.getMonth()+1)
                let mnt2 = (t2.getMonth()+1)
                let year = t2.getFullYear()-t1.getFullYear()
                return year*12+mnt2-mnt1
              }

              function totalMonth (array,months){
                let resTot = []

                try {
                    for (let i = startMonth;i<=months+startMonth;i++){
                       if(req.body.tipIzvestaja==="Troškovi registracije"){ 
                          resTot.push(array.filter(item=>{
                          let yr = new Date(array[0].datumRegistracije).getFullYear()-new Date(req.body.menuDateFrom).getFullYear()
                          return  ((new Date(item.datumRegistracije).getMonth())+1)+(yr*12)===i
              
                        }).reduce((a,b)=>a+b.troskoviRegistracije,0))
                        }else if(req.body.tipIzvestaja==="Potrošnja goriva"){
                            resTot.push(array.filter(item=>{
                                let yr = new Date(array[0].datum).getFullYear()-new Date(req.body.menuDateFrom).getFullYear()
                                return  ((new Date(item.datum).getMonth())+1)+(yr*12)===i
                              }).reduce((a,b)=>a+b.cena*b.potrosnja,0))
                        }else if(req.body.tipIzvestaja==="Troškovi za tag"){
                            resTot.push(array.filter(item=>{
                                let yr = new Date(array[0].datum).getFullYear()-new Date(req.body.menuDateFrom).getFullYear()
                                return  ((new Date(item.datum).getMonth())+1)+(yr*12)===i
                              }).reduce((a,b)=>a+b.cena,0))
                        }else if(req.body.tipIzvestaja==="Troškovi za pranje"){
                            resTot.push(array.filter(item=>{
                                let yr = new Date(array[0].datum).getFullYear()-new Date(req.body.menuDateFrom).getFullYear()
                                return  ((new Date(item.datum).getMonth())+1)+(yr*12)===i
                              }).reduce((a,b)=>a+b.cena,0))
                        }else if(req.body.tipIzvestaja==="Troškovi održavanja"){
                            resTot.push(array.filter(item=>{
                                let yr = new Date(array[0].datum).getFullYear()-new Date(req.body.menuDateFrom).getFullYear()
                                return  ((new Date(item.datum).getMonth())+1)+(yr*12)===i
                              }).reduce((a,b)=>a+b.ukupanTrosak,0))
                        }else if(req.body.tipIzvestaja==="Troškovi štete na vozilu"){
                            resTot.push(array.filter(item=>{
                                let yr = new Date(array[0].datum).getFullYear()-new Date(req.body.menuDateFrom).getFullYear()
                                return  ((new Date(item.datum).getMonth())+1)+(yr*12)===i
                              }).reduce((a,b)=>a+b.ukupanTrosak,0))
                        }else if(req.body.tipIzvestaja==="Ukupni troškovi"){
                            resTot.push(array.filter(item=>{
                                let yr = new Date(array[0].datum).getFullYear()-new Date(req.body.menuDateFrom).getFullYear()
                                return  ((new Date(item.datum).getMonth())+1)+(yr*12)===i
                              }).reduce((a,b)=>a+b.cena,0))
                        }
                        
                    }
                      return resTot
                } catch (error) {
                    for(let i = 0;i<=months;i++){
                        resTot.push(0)
                        return resTot
                    }
                    console.log(error)
                }
              }

              function addAr(num) { /////////////////Ovo bi trebalo da može da se odradi sa nizom i indexom
                let month = "";
                switch (num) {
                  case 1:
                    month = "Jan";
                    break;
                  case 2:
                    month = "Feb";
                    break;
                  case 3:
                    month = "Mart";
                    break;
                  case 4:
                    month = "Apr";
                    break;
                  case 5:
                    month = "Maj";
                    break;
                  case 6:
                    month = "Jun";
                    break;
                  case 7:
                    month = "Jul";
                    break;
                  case 8:
                    month = "Avg";
                    break;
                  case 9:
                    month = "Sept";
                    break;
                  case 10:
                    month = "Okt";
                    break;
                  case 11:
                    month = "Nov";
                    break;
                  case 12:
                    month = "Dec";
                    break;
                  default:
                    month = "Jan";
                }
              
                return month;
              }

              function editAr (nm, ar, firstMonth){

                let num = firstMonth
                for (let i = 0; i <= nm; i++) {
                  if (num > 12) {
                    num = 1
                  }
                  ar.push(addAr(num))
                  ++num
                }
              }
            



            for(let b of all){
                let podaci
                if(req.body.tipIzvestaja==="Troškovi registracije"){
                    let result = b.registracijaPolje.filter(item=>new Date(item.datumRegistracije)<=new Date(req.body.menuDateTo) && new Date(item.datumRegistracije)>= new Date(req.body.menuDateFrom))
                    podaci = totalMonth(result,meseci)}
                else if(req.body.tipIzvestaja==="Potrošnja goriva"){
                    let result = b.gorivoPolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip==="Gorivo")
                    podaci = totalMonth(result,meseci)
                }else if(req.body.tipIzvestaja==="Troškovi za tag"){
                    let result = b.gorivoPolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip==="Tag")
                    podaci = totalMonth(result,meseci)
                }else if(req.body.tipIzvestaja==="Troškovi za pranje"){
                    let result = b.gorivoPolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip==="Pranje")
                    podaci = totalMonth(result,meseci)
                }else if(req.body.tipIzvestaja==="Troškovi održavanja"){
                    let result = b.odrzavanjePolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip===req.body.todr)
                    podaci = totalMonth(result,meseci)
                }else if(req.body.tipIzvestaja==="Troškovi štete na vozilu"){
                    let result = b.stetaPolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip===req.body.pokr)
                    podaci = totalMonth(result,meseci)
                }else if(req.body.tipIzvestaja==="Ukupni troškovi"){
                    let result = []
                    let troskoviRegistracije = b.registracijaPolje.filter(item=>new Date(item.datumRegistracije)<=new Date(req.body.menuDateTo) && new Date(item.datumRegistracije)>= new Date(req.body.menuDateFrom))
                    for(let a of troskoviRegistracije){
                        result.push({datum:a.datumRegistracije,cena:a.troskoviRegistracije,tip:"Registracija"})
                    }
                    let troskoviGorivo = b.gorivoPolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip==="Gorivo")
                    for(let a of troskoviGorivo){
                        result.push({datum:a.datum,cena:a.potrosnja*a.cena,tip:"Gorivo"})
                    }
                    let troskoviTag =b.gorivoPolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip==="Tag")
                    for(let a of troskoviTag){
                        result.push({datum:a.datum,cena:a.cena,tip:"Tag"})
                    }
                    let troskoviPranje = b.gorivoPolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip==="Pranje")
                    for(let a of troskoviPranje){
                        result.push({datum:a.datum,cena:a.cena,tip:"Pranje"})
                    }
                    let troskoviOdrzavanjeHigijena=b.odrzavanjePolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip==="Higijena")
                    for(let a of troskoviOdrzavanjeHigijena){
                        result.push({datum:a.datum,cena:a.cena,tip:"Higijena"})
                    }
                    let troskoviOdrzavanjeGume=b.odrzavanjePolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip==="Gume")
                    for(let a of troskoviOdrzavanjeGume){
                        result.push({datum:a.datum,cena:a.cena,tip:"Gume"})
                    }
                    let troskoviOdrzavanjeRedovno=b.odrzavanjePolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip==="Redovno")
                    for(let a of troskoviOdrzavanjeRedovno){
                        result.push({datum:a.datum,cena:a.cena,tip:"Redovno"})
                    }
                    let troskoviOdrzavanjeVanredno=b.odrzavanjePolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom)).filter(item=>item.tip==="Vanredno")
                    for(let a of troskoviOdrzavanjeVanredno){
                        result.push({datum:a.datum,cena:a.cena,tip:"Vanredno"})
                    }
                    let troskoviStete = b.stetaPolje.filter(item=>new Date(item.datum)<=new Date(req.body.menuDateTo) && new Date(item.datum)>= new Date(req.body.menuDateFrom))
                    for(let a of troskoviStete){
                        result.push({datum:a.datum,cena:a.cena,tip:"Steta"})
                    }
                    
                    
                    
                    podaci = totalMonth(result,meseci)
                    console.log(podaci)
                }

                results.push({rb:++num,vozilo:b.markaTip+" - " +b.registracioniBroj, data:podaci})
            }
        
            editAr(meseci,headAr,startMonth)
            let resp = {tableHead:headAr,dataTable:results}
        res.send(resp)


    } catch (error) {
        console.log(error)
        res.send(error)
    }


}

module.exports = { Main, Zaposleni, EditCars, SingleCar, RegistracijaEdit, SpecifikacijaEdit, GorivoEdit, OdrzavanjeEdit, StetaEdit, Serviseri, ServiseriEdit,Vozila,IzvestajiPost }
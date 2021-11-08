let { CarsModel, ServiseriModel, CommentsModel, ZaposleniModel } = require("../Modeli/Podaci")


const RegistracijaDelete = async(req,res)=>{
    
    try {
        const car = await CarsModel.findById(req.params.carId)
        car.registracijaPolje = car.registracijaPolje.filter(item=>item._id!==req.body.id)
        car.save()
        res.send("success")
    } catch (error) {
        console.log(error)
    }
}

const SpecifikacijaDelete = async(req,res)=>{

    try {
        
        const car = await CarsModel.findById(req.params.carId)
        car.specifikacijaPolje = car.specifikacijaPolje.filter(item=>item._id!==req.body.id)
        car.save()
        res.send("success")

    } catch (error) {
        console.log(error)
    }

}

const GorivoDelete = async(req,res)=>{

    try {
        
        const car = await CarsModel.findById(req.params.carId)
        car.gorivoPolje = car.gorivoPolje.filter(item=>item._id!==req.body.id)
        car.save()
        res.send("success")

    } catch (error) {
        console.log(error)
    }

}

const OdrzavanjeDelete = async(req,res)=>{

    try {
        
        const car = await CarsModel.findById(req.params.carId)
        car.odrzavanjePolje = car.odrzavanjePolje.filter(item=>item._id!==req.body.id)
        car.save()
        res.send("success")

    } catch (error) {
        console.log(error)
    }

}

const StetaDelete = async(req,res)=>{

    try {
        
        const car = await CarsModel.findById(req.params.carId)
        car.stetaPolje = car.stetaPolje.filter(item=>item._id!==req.body.id)
        car.save()
        res.send("success")

    } catch (error) {
        console.log(error)
    }

}



module.exports = {RegistracijaDelete,SpecifikacijaDelete,GorivoDelete,OdrzavanjeDelete,StetaDelete}
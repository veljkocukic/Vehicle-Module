let {CarsModel,ServiseriModel,CommentsModel} = require("../Modeli/Podaci")





let formatDate = (dt)=>{
    let date =  new Date(dt).toLocaleDateString().replaceAll("/",".")

    return date+"."

}
const Main = async(req,res)=>{

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
                tipKorisnika:a.tipKorisnika
            })
        }
        res.json(arr)
        console.log(arr)
        
    } catch (error) {
        console.log(error)
    }

}

module.exports = {Main}
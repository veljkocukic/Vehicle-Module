let express = require("express")
let app = express()
let cors = require("cors")
let mongoose = require("mongoose")
let {Podaci} = require("./Modeli/Podaci")
require("dotenv").config()
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));




//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const proba = async() =>{
    try {
        const test = await Podaci.serviseri.create({
            zaposleni:"test",
            predlog:"ds",
            komentar:"dss",
            status:"sds"
        })

    } catch (error) {
        console.log(error)
    }
}


















///////////////////////////////////////////////////////////////////////////////////////////////////////////////




const connectDB = (url) => {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
  }

const PORT = 5000
const start = async () => {
    try {
      await connectDB(process.env.MONGO_PASS);
      app.listen(port, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
start()

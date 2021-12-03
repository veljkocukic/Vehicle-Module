let express = require("express")
let app = express()
let cors = require("cors")
let mongoose = require("mongoose")
require("dotenv").config()
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
let { router } = require("./Rute/Rute")


app.use("/api/v1", router)


const connectDB = (pass) => {
  return mongoose.connect("mongodb+srv://Veljko:" + pass + "@cluster0.vsesy.mongodb.net/CarModule?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

const PORT = 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_PASS);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start()

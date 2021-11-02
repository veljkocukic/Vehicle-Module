let express = require("express")
let app = express()




require("dotenv").config()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("d")
})


const PORT = 5000
app.listen(PORT, ()=>console.log("Server is listening..."))
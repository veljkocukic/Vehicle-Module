const jwt = require("jsonwebtoken")

module.exports = function(req,res,next){

    const token = req.body.token
    if(!token){ 
        return res.json({"access":"denied"})}
    try{
        const verified = jwt.verify(token,process.env.SECRET)
        next()
    }catch(err){
        res.json({"error":"true"})
    }
}
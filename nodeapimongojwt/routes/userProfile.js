const router = require("express").Router();
const verify = require("./middleware/verifyToken")

router.get('/profile',verify,(req,res)=>{
    res.send(req.user)
    res.json({name:"JAYARAM K SURENDRAN",mobile:"9656912880",age:"39"})
})


module.exports = router
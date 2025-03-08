const express =  require("express")

const router = express.Router()
const Bank = require("../models/Bank")

router.get("/", async (req, res) => {
    try {
        const banks = await Bank.find()
        res.json(banks)
    } catch (error) {
        res.json({message : error})
    }
}
)
router.post('/create',async (req,res)=>{
    const {BIC,name,IFSC} = req.body
    const newBank = new Bank({
        BIC: BIC,
        name: name,
        IFSC: IFSC
    })
    try {
        const savedBank = await newBank.save()
        res.json(savedBank)
    } catch (error) {
        res.json({message : error})
    }
}
)



module.exports = router


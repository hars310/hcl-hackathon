const express =  require("express")

const router = express.Router()
const TransactionTime = require("../models/TransactionTime")


router.post('/',async (req,res)=>{
    const {FromBIC,ToBIC,TimeTakenInMinutes} = req.body
    const newTransactiontime = new TransactionTime({
        FromBIC: FromBIC,
        ToBIC: ToBIC,
        TimeTakenInMinutes: TimeTakenInMinutes
    })
    try {
        const savedTransactiontime = await newTransactiontime.save()
        res.json(savedTransactiontime)
    } catch (error) {
        res.json({message : error})
    }
})



module.exports = router
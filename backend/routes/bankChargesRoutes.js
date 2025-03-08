const express =  require("express")

const router = express.Router()
const BankCharges = require("../models/BankCharges")

router.get("/", async (req, res) => {
    try {
        const banks = await BankCharges.find()
        res.json(banks)
    } catch (error) {
        res.json({message : error})
    }
}
)

router.post("/", async (req, res) => {
    const bankcharges = new BankCharges({
        BIC : req.body.BIC,
        Charge : req.body.Charge
    })

    try {
        const savedBankcharges = await bankcharges.save()
        res.json(savedBankcharges)
    } catch (error) {
        res.json({message : error})
    }
}
)

module.exports = router
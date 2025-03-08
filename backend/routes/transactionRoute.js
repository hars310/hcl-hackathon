const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const { transferCheapest, transferFastest } = require("../controllers/transactions");

router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/transfer/fastest", async (req, res) => {
    try {
        const { FromBIC, ToBIC, amount } = req.body;
        const result = await transferFastest(FromBIC, ToBIC, amount);
        res.json({ message: "Transfer completed via fastest route", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/transfer/cheapest", async (req, res) => {
    try {
        const { FromBIC, ToBIC, amount } = req.body;
        const result = await transferCheapest(FromBIC, ToBIC, amount);
        res.json({ message: "Transfer completed via cheapest route", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

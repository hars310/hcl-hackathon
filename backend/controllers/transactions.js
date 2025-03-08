const mongoose = require("mongoose");
const PriorityQueue = require("priorityqueuejs");
const Transaction = require("../models/Transaction");
const TransactionTime = require("../models/TransactionTime");
const BankCharges = require("../models/BankCharges");

async function findOptimalPath(FromBIC, ToBIC, weightType) {
    const graph = {};

    
    const transactions = await TransactionTime.find();
    transactions.forEach(tx => {
        if (!graph[tx.FromBIC]) graph[tx.FromBIC] = {};
        
        if (weightType === "TimeTakenInMinutes") {
            graph[tx.FromBIC][tx.ToBIC] = tx.TimeTakenInMinutes;
        } else {
            graph[tx.FromBIC][tx.ToBIC] = Infinity; 
        }
    });

    
    if (weightType === "Charge") {
        const charges = await BankCharges.find();
        charges.forEach(ch => {
            if (graph[ch.BIC]) {
                Object.keys(graph[ch.BIC]).forEach(dest => {
                    if (graph[ch.BIC][dest] !== undefined) {
                        graph[ch.BIC][dest] = ch.Charge; 
                    }
                });
            }
        });
    }

    const pq = new PriorityQueue((a, b) => a.cost - b.cost);
    const distances = {};
    const prev = {};

    Object.keys(graph).forEach(node => {
        distances[node] = Infinity;
        prev[node] = null;
    });

    distances[FromBIC] = 0;
    pq.enq({ node: FromBIC, cost: 0 });

    while (!pq.isEmpty()) {
        const { node: currentNode, cost: currentCost } = pq.deq();
        if (currentNode === ToBIC) break;

        for (const neighbor in graph[currentNode]) {
            let alt = currentCost + graph[currentNode][neighbor];

            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                prev[neighbor] = currentNode;
                pq.enq({ node: neighbor, cost: alt });
            }
        }
    }

    let path = [];
    let step = ToBIC;
    while (step) {
        path.unshift(step);
        step = prev[step];
    }   

    if (path.length === 1 && path[0] !== FromBIC) return { path: [], cost: Infinity };

    return { path, cost: distances[ToBIC] };
}

async function transferFastest(fromBIC, toBIC, amount) {
    const { path, cost } = await findOptimalPath(fromBIC, toBIC, "TimeTakenInMinutes");

    if (path.length === 0) {
        console.log("No valid path found for fastest transfer.");
        return { message: "No valid path found", path: [], timeTaken: Infinity };
    }

    await Transaction.create({ FromBIC: fromBIC, ToBIC: toBIC, amount, TimeTakenInMinutes: cost });
    return { path, timeTaken: cost };
}

async function transferCheapest(fromBIC, toBIC, amount) {
    const { path, cost } = await findOptimalPath(fromBIC, toBIC, "Charge");

    if (path.length === 0) {
        console.log("No valid path found for cheapest transfer.");
        return { message: "No valid path found", path: [], totalCharge: Infinity };
    }

    await Transaction.create({ FromBIC: fromBIC, ToBIC: toBIC, amount, TotalCharge: cost });
    return { path, totalCharge: cost };
}

module.exports = { findOptimalPath, transferFastest, transferCheapest };

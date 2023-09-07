const express = require('express');
const nameDataset = require('../datasets/name_dataset.json');
const dbClient = require('../database/index');
const mainRouter = express.Router();

mainRouter.get("/",(req,res) => {
    res.send("Hello From Ankit Main Router");
})

mainRouter.get("/generateNames",async (req,res)=>{
    let names = "";
    const offset = Math.floor(Math.random()*(35000-1)+1);
    const fetchNames = await dbClient.query("SELECT people_name FROM dataccrue_dataset.name_dataset limit 50 OFFSET "+offset).then(results => {
        console.log("results as follows",results.rowCount);
        return results.rows;
    }).catch(err => {
        console.log("Error Occured",err);
    });
    console.log("fetchNames",fetchNames);
    if (fetchNames !== null && fetchNames.length > 0) {
        fetchNames.forEach((rowItem) => {
            names = names + rowItem['people_name'] + "<br/>";
        })
    }
    res.status(200).send(names);
})

module.exports = mainRouter;

const express = require('express');
const nameDataset = require('../datasets/name_dataset.json');
const mainRouter = express.Router();

mainRouter.get("/",(req,res) => {
    res.send("Hello From Ankit Main Router");
})

mainRouter.get("/generateNames",(req,res)=>{
    let names = "";
    const processStart = Math.floor(Math.random()*(35000-1)+1);
    const processEnd = processStart + 50;
    let nameLimiter = nameDataset.slice(processStart, processEnd);
    nameLimiter.forEach((item)=>{
        names = names + item.people_name + "<br/>";
    })
    res.status(200).send(names);
})

module.exports = mainRouter;
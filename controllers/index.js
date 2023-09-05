const express = require('express');

const mainRouter = express.Router();

mainRouter.get("/",(req,res) => {
    res.send("Hello From Ankit Main Router");
})

mainRouter.get("/generateNames",(req,res)=>{
    res.send("Name Generation Started");
})

module.exports = mainRouter;
const express = require('express');
const dbClient = require('../database/index');
const mainRouter = express.Router();

mainRouter.get("/",(req,res) => {
    res.send("Hello From Ankit Main Router");
})

mainRouter.get("/generateNames",async (req,res)=>{
    let names = "<table><tr><th>Name</th><th>Email Address</th><th>Phone Number</th></tr>";
    const offset = Math.floor(Math.random()*(35000-1)+1);
    const fetchNames = await dbClient.query("SELECT people_name FROM dataccrue_dataset.name_dataset limit 50 OFFSET "+offset).then(results => {
        console.log("results as follows from names db",results.rowCount);
        return results.rows;
    }).catch(err => {
        console.log("Error Occured While Fetching in Names db",err);
    });
    const fetchEmails = await dbClient.query("SELECT email_addresses FROM dataccrue_dataset.email_dataset limit 50").then(results => {
        console.log("results as follows from emails db",results.rowCount);
        return results.rows;
    }).catch(err => {
        console.log("Error Occured While Fetching in emails db",err);
    });
    const fetchPhoneNumbers = await dbClient.query("SELECT mobile_numbers FROM dataccrue_dataset.phone_dataset limit 50").then(results => {
        console.log("results as follows from phones db",results.rowCount);
        return results.rows;
    }).catch(err => {
        console.log("Error Occured While Fetching in Phones db",err);
    });
    if (fetchNames !== null && fetchNames.length > 0) {
        fetchNames.forEach((rowItem,index) => {
            names = names + `<tr>
                    <td>${rowItem['people_name']}</td>
                    <td>${fetchEmails[index]["email_addresses"]}</td>
                    <td>${fetchPhoneNumbers[index]["mobile_numbers"]}</td>
                    </tr>`;
        })
    }
    names = names + "</table>"
    res.status(200).send(names);
})

module.exports = mainRouter;

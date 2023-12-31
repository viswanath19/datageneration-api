const express = require('express');
const dbClient = require('../database/index');
const mainRouter = express.Router();

mainRouter.get("/",(req,res) => {
    res.send("Hello From Ankit Main Router");
})

mainRouter.get("/generateNames",async (req,res)=>{
    console.log("came here",req.query);
    const {rows, cols, format} = req.query;
    let names = `<table><tr>${cols.includes('name') ? `<th>Name</th>` : ''}${cols.includes('email') ? `<th>Email Address</th>` : ''}${cols.includes('mobile') ? `<th>Phone Number</th>` : ''}</tr>`;
    const offset = Math.floor(Math.random()*(35000-1)+1);
    const fetchNames = await dbClient.query("SELECT people_name FROM dataccrue_dataset.name_dataset limit " +rows +" OFFSET "+offset).then(results => {
        console.log("results as follows from names db",results.rowCount);
        return results.rows;
    }).catch(err => {
        console.log("Error Occured While Fetching in Names db",err);
    });
    const fetchEmailCounts = await dbClient.query("SELECT count(*) FROM dataccrue_dataset.email_dataset").then(results => {
        return Math.floor(Math.random()*(results.rows[0]['count']-1)+1);
    }).catch(err => {
        console.log("Error Occured While Fetching in emails db counts",err);
    })

    const fetchEmails = await dbClient.query("SELECT email_addresses FROM dataccrue_dataset.email_dataset limit "+rows+" OFFSET "+fetchEmailCounts).then(results => {
        console.log("results as follows from emails db",results.rowCount);
        return results.rows;
    }).catch(err => {
        console.log("Error Occured While Fetching in emails db",err);
    });
    
    const fetchPhoneNumberCounts = await dbClient.query("SELECT count(*) FROM dataccrue_dataset.phone_dataset").then(results => {
        return Math.floor(Math.random()*(results.rows[0]['count']-1)+1);
    }).catch(err => {
        console.log("Error Occured While Fetching in phone db counts",err);
    });
    const fetchPhoneNumbers = await dbClient.query("SELECT mobile_numbers FROM dataccrue_dataset.phone_dataset limit "+rows+" OFFSET "+fetchPhoneNumberCounts).then(results => {
        console.log("results as follows from phones db",results.rowCount);
        return results.rows;
    }).catch(err => {
        console.log("Error Occured While Fetching in Phones db",err);
    });

    if (fetchNames !== null && fetchNames.length > 0) {
        fetchNames.forEach((rowItem,index) => {
            names = names + `<tr>
                    ${cols.includes('name') ? `<td>${rowItem['people_name']}</td>` : ''}
                    ${cols.includes('email') ? `<td>${fetchEmails[index]["email_addresses"]}</td>` : ''}
                    ${cols.includes('mobile') ? `<td>${fetchPhoneNumbers[index]["mobile_numbers"]}</td>` : ''}
                    </tr>`;
        })
    }
    names = names + "</table>"
    res.status(200).send(names);
})

module.exports = mainRouter;

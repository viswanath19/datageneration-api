const nameDataset = require('../datasets/name_dataset.json');
const dbClient = require('../database/index');

const generateEmailAddresses = () => {
    console.log("path as>>>",__dirname);
    dbClient.query("SELECT count(email_addresses) FROM dataccrue_dataset.email_dataset").then(results => {
        dbClient.query("SELECT people_name FROM dataccrue_dataset.name_dataset limit 1 OFFSET "+results.rows[0]['count']).then(results => {
            if (Array.isArray(results.rows) && results.rows.length > 0 && typeof results.rows[0] === 'string') {
                dbClient.query("INSERT INTO dataccrue_dataset.email_dataset (email_addresses) VALUES ($1) RETURNING *",[results.rows[0]["people_name"] + "@gmail.com".toLowerCase().replaceAll(" ",".")],(err,results) => {
                    if (err) {
                        console.log("Error Occured while Inserting email address",err);
                    } else {
                        console.log("Email Address Inserted",results.rows[0]);
                    }
                });
            } else {
                console.log("Something went wrong");
            }
        }).catch(err => {
            console.log("Error occured while fetch the name",err);
        });
    }).catch(err => {
        console.log("Error Occured while querying email db",err);
    });
}

module.exports = generateEmailAddresses;
const dbClient = require('../database/index');

const generateMobileNumbers = async () => {
    dbClient.query("SELECT count(*) FROM dataccrue_dataset.phone_dataset",(err,results) => {
        if (!err && results.rows[0]['count'] < 50000) {
            const generateRandomMobileNumber = Math.floor(Math.random()*(9999999999-6000000000)+6000000000);
            dbClient.query("INSERT INTO dataccrue_dataset.phone_dataset (mobile_numbers) VALUES ($1) RETURNING *",[generateRandomMobileNumber],(err,results) => {
                if (err) {
                    console.log("Error Occured while Inserting data",err);
                } else {
                    console.log("Mobile Number Inserted",results.rows[0],generateRandomMobileNumber);
                }
            });
        } else {
            console.log("Skipping the mobile number generation");
        }
    });
}

module.exports = generateMobileNumbers;
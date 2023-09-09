const nameDataset = require('../datasets/name_dataset.json');
const dbClient = require('../database/index');

const generateMobileNumbers = () => {
    console.log("path as>>>",__dirname);
    const generateRandomMobileNumber = Math.floor(Math.random()*(9999999999-6000000000)+6000000000);
    dbClient.query("INSERT INTO dataccrue_dataset.phone_dataset (mobile_numbers) VALUES ($1) RETURNING *",[generateRandomMobileNumber],(err,results) => {
        if (err) {
            console.log("Error Occured while Inserting data",err);
        } else {
            console.log("Mobile Number Inserted",results.rows[0],generateRandomMobileNumber);
        }
    });
    
}

module.exports = generateMobileNumbers;
const nameDataset = require('../datasets/name_dataset.json');
const fs = require('fs');
const path = require('path');

const generateEmailAddresses = () => {
    console.log("path as>>>",__dirname);
    const fetchIndex = Math.floor(Math.random()*(50000-1)+1);
    const fetchDatasetItem = nameDataset[fetchIndex];
    if (Object.keys(fetchDatasetItem).indexOf('email_address') === -1) {
        fetchDatasetItem['email_address'] = fetchDatasetItem["people_name"].toLowerCase().replace(" ",".").concat('@gmail.com');
        nameDataset[fetchIndex] = fetchDatasetItem;
        fs.writeFile(path.join(__dirname,"name_dataset.json"),JSON.stringify(nameDataset),err=>{
            if (err) {
                console.error("Error occured while writing to file",err);
            } else {
                console.log("Email Address added to object",fetchDatasetItem);
            }
        })
    } else {
        console.log("Already Email Address Existing>>skipping",fetchDatasetItem);
    }
    
}

module.exports = generateEmailAddresses;
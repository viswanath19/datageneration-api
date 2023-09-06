const nameDataset = require('../datasets/name_dataset.json');
const fs = require('fs');
const path = require('path');

const generateMobileNumbers = () => {
    console.log("path as>>>",__dirname);
    const fetchIndex = Math.floor(Math.random()*(50000-1)+1);
    const fetchDatasetItem = nameDataset[fetchIndex];
    if (Object.keys(fetchDatasetItem).indexOf('mobile_number') === -1) {
        fetchDatasetItem['mobile_number'] = Math.floor(Math.random()*(9999999999-6000000000)+6000000000);
        nameDataset[fetchIndex] = fetchDatasetItem;
        fs.writeFile(path.join(__dirname,"name_dataset.json"),JSON.stringify(nameDataset),err=>{
            if (err) {
                console.error("Error occured while writing to file",err);
            } else {
                console.log("Mobile Number added to object",fetchDatasetItem);
            }
        })
    } else {
        console.log("Already Mobile Number Existing>>skipping",fetchDatasetItem);
    }
    
}

module.exports = generateMobileNumbers;
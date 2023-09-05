
const generateMobileNumbers = () => {
    console.log("Generating a mobile number",Math.floor(Math.random()*(9999999999-6000000000)+6000000000));
}

module.exports = generateMobileNumbers;
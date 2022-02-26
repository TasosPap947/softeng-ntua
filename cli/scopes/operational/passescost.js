const axios = require("axios");
const env = require("../../env.js");

function passescostFunction(op1_ID, op2_ID, date_from, date_to) {
    axios.get(`${env.baseURL}/PassesCost/${op1_ID}/${op2_ID}/${date_from}/${date_to}`).then((res) => {
        console.log(res.data);
    });
}

module.exports = { passescostFunction };
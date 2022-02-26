const axios = require("axios");
const env = require("../../env.js");

function passescostFunction(op1_ID, op2_ID, date_from, date_to, format) {
    env.instance
        .get(`${env.baseURL}/PassesCost/${op1_ID}/${op2_ID}/${date_from}/${date_to}?format=${format}`)
        .then((res) => {
            console.log(res.data);
        });
}

module.exports = { passescostFunction };

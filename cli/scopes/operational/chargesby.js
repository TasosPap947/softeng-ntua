const axios = require("axios");
const env = require("../../env.js");

function chargesbyFunction(op_ID, date_from, date_to) {
    env.instance.get(`${env.baseURL}/ChargesBy/${op_ID}/${date_from}/${date_to}`).then((res) => {
        console.log(res.data);
    });
}

module.exports = { chargesbyFunction };

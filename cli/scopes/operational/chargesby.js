const axios = require("axios");
const env = require("../../env.js");

function chargesbyFunction(op_ID, date_from, date_to, format) {
    env.instance.get(`${env.baseURL}/ChargesBy/${op_ID}/${date_from}/${date_to}?format=${format}`).then((res) => {
        console.log(res.data);
    });
}

module.exports = { chargesbyFunction };

const axios = require("axios");
const env = require("../../env.js");

function adminFunction(source) {
    /* give a name to the url */
    axios.post(`${env.baseURL}/admin/.....`).then((res) => {
        console.log(res.data);
    });
}

module.exports = { adminFunction };

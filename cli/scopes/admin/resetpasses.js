const axios = require("axios");
const env = require("../../env.js");

function resetpassesFunction() {
    axios.post(`${env.baseURL}/admin/resetpasses`).then((res) => {
        console.log(res.data);
    });
}

module.exports = { resetpassesFunction };

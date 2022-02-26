const axios = require("axios");
const env = require("../../env.js");

function healthcheckFunction() {
    env.instance.get(`${env.baseURL}/admin/healthcheck`).then((res) => {
        console.log(res.data);
    });
}

module.exports = { healthcheckFunction };

const axios = require("axios");
const env = require("../../env.js");

function resetvehiclesFunction() {
    env.instance.post(`${env.baseURL}/admin/resetvehicles`).then((res) => {
        console.log(res.data);
    });
}

module.exports = { resetvehiclesFunction };

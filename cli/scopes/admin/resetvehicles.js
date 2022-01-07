const axios = require("axios");
const env = require("../../env.js");

function resetvehiclesFunction() {
    axios.post(`${env.baseURL}/admin/resetvehicles`).then((res) => {
        console.log(res.data);
    });
}

module.exports = { resetvehiclesFunction };

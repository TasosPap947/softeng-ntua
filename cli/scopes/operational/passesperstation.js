const axios = require("axios");
const env = require("../../env.js");

function passesperstationFunction(stationID, date_from, date_to, format) {
    env.instance
        .get(`${env.baseURL}/PassesPerStation/${stationID}/${date_from}/${date_to}?format=${format}`)
        .then((res) => {
            console.log(res.data);
        });
}

module.exports = { passesperstationFunction };

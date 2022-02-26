const baseURL = "http://localhost:9103/interoperability/api";

const healthcheckURL = `${baseURL}/admin/healthcheck`;
const resetpassesURL = `${baseURL}/admin/resetpasses`;
const resetstationsURL = `${baseURL}/admin/resetstations`;
const resetvehiclesURL = `${baseURL}/admin/resetvehicles`;

const h1healthcheck = document.getElementById("healthcheck");
const h1resetpasses = document.getElementById("resetpasses");
const h1resetstations = document.getElementById("resetstations");
const h1resetvehicles = document.getElementById("resetvehicles");

function healthcheckFunction() {
    fetch(healthcheckURL)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("healthcheck").innerHTML = "I changed!";
        });
}

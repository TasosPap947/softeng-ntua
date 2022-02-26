import * as env from "../env.js";

document.addEventListener("DOMContentLoaded", function (event) {
    const form = document.getElementById("pass-form");

    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const params = Object.fromEntries(urlSearchParams.entries());

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("submit event detected");
        console.log(env.baseURL);
        // console.log(params);

        const charge = document.getElementById("charge").value;
        console.log(charge);
        const VehiclevehicleID = document.getElementById("VehiclevehicleID").value;
        const StationstationID = document.getElementById("StationstationID").value;

        // const charge = params.charge;
        // const VehiclevehicleID = params.VehiclevehicleID;
        // const StationstationID = params.StationstationID;

        // fetch("https://example.com/profile", {
        //     method: "POST", // or 'PUT'
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log("Success:", data);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        // const passURL = `${env.baseURL}/PassesCost/AO/EG/2019-10-01 00:00:00/2021-10-01 00:00:00`;
        /* TODO: make fetch work with POST instead of GET */
        const passURL = `${env.baseURL}/insertPass/${charge}/${VehiclevehicleID}/${StationstationID}`;

        // const data = {charge:}
        const postObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        };
        await fetch(passURL, postObj)
            .then((response) => {
                if (!response.ok) {
                    console.log("Response not okay");
                }
                return response.json();
            })
            .then((data) => {
                const para = document.getElementById("pass-result");
                // const isOK = data.op1_ID !== null;
                const isOK = data.status === "OK";
                const nodeString = isOK
                    ? "Η διέλευση καταχωρήθηκε με επιτυχία"
                    : "Υπήρξε σφάλμα κατά την καταχώρηση της διέλευσης";
                para.innerHTML = nodeString;
                para.style.color = isOK ? "#22cc22" : "#ff2222";
            })
            .catch((err) => {
                const para = document.getElementById("pass-result");
                const nodeString = "Υπήρξε σφάλμα κατά την καταχώρηση της διέλευσης";
                para.innerHTML = nodeString;
                para.style.color = "#ff2222";
            });
    });
});

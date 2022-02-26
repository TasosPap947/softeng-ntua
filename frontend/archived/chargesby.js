import * as env from "../env.js";

document.addEventListener("DOMContentLoaded", function (event) {
    const form = document.getElementById("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("submit event detected");
    });

    console.log(env.baseURL);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const op_ID = params.op_ID;
    const date_from = params.date_from;
    const date_to = params.date_to;
    const ChargesByURL = `${env.baseURL}/ChargesBy/${op_ID}/${date_from}/${date_to}`;
    fetch(ChargesByURL)
        .then((response) => response.json())
        .then((data) => {
            for (const item of data.PPOList) {
                const para = document.createElement("p");
                const nodeString = `VisitingOperator: ${item.VisitingOperator} NumberOfPasses: ${item.NumberOfPasses} PassesCost: ${item.PassesCost}`;
                const node = document.createTextNode(nodeString);
                para.appendChild(node);
                const element = document.getElementById("div-to-grow");
                element.appendChild(para);
            }
        });
});

/* να βάλω στο documentation το endpoint operatorList */

// endpoint operatorList() = {operators: [{operatorName: aodos, operatorID: AO}, {}, {}]}

import * as env from "../env.js";

function findDebt(debtsTable, op1, op2) {
    let list = debtsTable.DebtList;
    for (let item of list) {
        if (item.OwedFrom === op1 && item.OwedTo === op2) {
            return String(item.Amount);
        }
    }
    return 0;
}

document.addEventListener("DOMContentLoaded", async (event) => {
    const myParent = document.getElementById("operator-div");

    let operatorListURL = `${env.baseURL}/operatorList`;
    let operatorListExtra;
    let operatorList;

    await fetch(operatorListURL)
        .then((response) => response.json())
        .then((data) => {
            operatorList = data.operators;
        });

    let operatorListCopy = [];
    for (let item of operatorList) {
        operatorListCopy.push(item.operatorID);
    }
    operatorList = operatorListCopy;
    console.log(operatorList);
    operatorListExtra = [...operatorList];
    operatorListExtra.unshift("All Operators");

    console.log();

    const selectList = document.createElement("select");
    selectList.classList.add("form-select");
    selectList.id = "operator-id";
    selectList.name = "operatorID";
    myParent.appendChild(selectList);

    for (const item of operatorListExtra) {
        const option = document.createElement("option");
        option.value = item;
        option.text = item;
        selectList.appendChild(option);
    }

    const form = document.getElementById("debts-form");
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    async function eventListenerFunction(e, operatorList) {
        e.preventDefault();
        console.log("operatorList from inside eventListenerFunction" + operatorList);
        console.log("submit event detected");
        console.log(env.baseURL);

        const dateFrom = document.getElementById("date-from").value;
        const dateTo = document.getElementById("date-to").value;
        const operatorID = document.getElementById("operator-id").value;

        let debtsURL = `${env.baseURL}/calculateDebts/${dateFrom}/${dateTo}`;
        console.log(dateFrom, dateTo);
        console.log(debtsURL);

        await fetch(debtsURL)
            .then((response) => {
                if (!response.ok) {
                    console.log("Response not okay");
                }
                return response.json();
            })
            .then((data) => {
                const debtsTable = data;
                const debtsDiv = document.getElementById("debts-results");
                debtsDiv.innerHTML = "";
                const tableTitle = document.createElement("p");
                tableTitle.innerHTML = operatorID;
                debtsDiv.appendChild(tableTitle);
                console.log(data);
                if (operatorID === "All Operators" /* might be changed */) {
                    /* create first table row */
                    const table = document.createElement("table");
                    const firstTableRow = document.createElement("tr");

                    for (const item of [" ", ...operatorList]) {
                        let th = document.createElement("th");
                        th.classList.add("text-center", "border", "border-secondary", "p-3");
                        th.innerHTML = item;
                        firstTableRow.appendChild(th);
                    }

                    debtsDiv.appendChild(table);
                    table.appendChild(firstTableRow);

                    document.createElement("table");
                    let i = 0;
                    for (const rowItem of operatorList) {
                        const row = document.createElement("tr");
                        let cnt = 0;
                        let j = 0;
                        for (const colItem of [" ", ...operatorList]) {
                            const data = document.createElement(cnt == 0 ? "th" : "td");
                            data.classList.add("text-center", "border", "border-secondary", "p-3");
                            if (i + 1 !== j) {
                                data.innerHTML =
                                    cnt == 0 ? rowItem : findDebt(debtsTable, rowItem, colItem); /* change */
                            } else {
                                data.innerHTML = cnt == 0 ? rowItem : "-";
                            }
                            row.appendChild(data);
                            cnt++;
                            j++;
                        }
                        table.appendChild(row);
                        i++;
                    }
                } else {
                    /* Create headers */
                    const table = document.createElement("table");
                    const firstTableRow = document.createElement("tr");

                    for (const item of ["operator", "owes to", "owed from"]) {
                        const tableHeader = document.createElement("th");
                        tableHeader.classList.add("text-center", "border", "border-secondary", "p-3");
                        tableHeader.innerHTML = item;
                        firstTableRow.appendChild(tableHeader);
                    }
                    table.appendChild(firstTableRow);
                    debtsDiv.appendChild(table);
                    /* For each operator write owed to/from */
                    console.log(operatorList);
                    for (const item1 of operatorList) {
                        /* make text center */
                        if (item1 !== operatorID) {
                            const row = document.createElement("tr");
                            const data1 = document.createElement("td");
                            data1.innerHTML = item1;
                            const data2 = document.createElement("td");
                            data2.innerHTML = findDebt(debtsTable, operatorID, item1); /* for testing */
                            const data3 = document.createElement("td");
                            data3.innerHTML = findDebt(debtsTable, item1, operatorID); /* for testing */

                            for (let data of [data1, data2, data3]) {
                                data.classList.add("text-center", "border", "border-secondary", "p-3");
                                row.appendChild(data);
                            }
                            table.appendChild(row);
                        }
                    }
                }
                debtsDiv.appendChild(table);
            })
            .catch((err) => {});
    }

    // let operatorListTest = [1, 2, 3];
    form.addEventListener("submit", function (e) {
        eventListenerFunction(e, operatorList);
    });
});

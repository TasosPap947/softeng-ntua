const converter = require("json-2-csv");
/*
  helpful function to easily respond according to required format (json or csv)
*/
function respond (res, status, data, format) {
  if (format === "csv") {
    converter.json2csv(data, (err, csv) => {
      if (err) {
          throw err;
      }
      res.status(status).send(csv);
    });
  }
  else if (format === "json" || format === undefined) {
    res.status(status).send(data);
  }
  else res.status(400).send("query variable format should be {json|csv}");
}

module.exports = { respond };

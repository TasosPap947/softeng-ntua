const converter = require("json-2-csv");
/*
  helpful function to easily respond according to required format (json or csv)
*/
exports.general = function FormattedResponse(res, status, data, format) {

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
  else res.status(400).send("Unable to process request. Query variable format should be {json|csv}");
}

exports.PassesPerStation = function FormattedResponsePassesPerStation(res, status, data, format) {

  if (format === "csv") {
    var new_data = [];
    for (var i = 0; i < data.PassesList.length; i++) {
      const pass = {
        Station : data.Station,
        StationOperator : data.StationOperator,
        RequestTimestamp : data.RequestTimestamp,
        PeriodFrom : data.PeriodFrom,
        PeriodTo : data.PeriodTo,
        NumberOfPasses : data.NumberOfPasses,
        PassIndex : data.PassesList[i].PassIndex,
        PassID : data.PassesList[i].PassID,
        PassTimeStamp : data.PassesList[i].PassTimeStamp,
        VehicleID : data.PassesList[i].VehicleID,
        TagProvider : data.PassesList[i].TagProvider,
        PassType : data.PassesList[i].PassType,
        PassCharge : data.PassesList[i].PassCharge
      };
      new_data.push(pass);
    }
    converter.json2csv(new_data, (err, csv) => {
      if (err) {
        res.status(500).send("Internal error while converting response to csv format");
        throw err;
      }
      res.status(status).send(csv);
    });
  }
  else if (format === "json" || format === undefined) {
    res.status(status).send(data);
  }
  else res.status(400).send("Unable to process request. Query variable format should be {json|csv}");
}

exports.ChargesBy = function FormattedResponseChargesBy(res, status, data, format) {

  if (format === "csv") {
    var new_data = [];
    for (var i = 0; i < data.PPOList.length; i++) {
      const pass = {
        op_ID : data.op_ID,
        RequestTimestamp : data.RequestTimestamp,
        PeriodFrom : data.PeriodFrom,
        PeriodTo : data.PeriodTo,
        VisitingOperator : data.PPOList[i].VisitingOperator,
        NumberOfPasses : data.PPOList[i].NumberOfPasses,
        PassesCost : data.PPOList[i].PassesCost
      };
      new_data.push(pass);
    }
    converter.json2csv(new_data, (err, csv) => {
      if (err) {
        res.status(500).send("Internal error while converting response to csv format");
        throw err;
      }
      res.status(status).send(csv);
    });
  }
  else if (format === "json" || format === undefined) {
    res.status(status).send(data);
  }
  else res.status(400).send("Unable to process request. Query variable format should be {json|csv}");
}

exports.PassesAnalysis = function FormattedResponsePassesAnalysis(res, status, data, format) {

  if (format === "csv") {
    var new_data = [];
    for (var i = 0; i < data.PassesList.length; i++) {
      const pass = {
        op1_ID : data.op1_ID,
        op2_ID : data.op2_ID,
        RequestTimestamp : data.RequestTimestamp,
        PeriodFrom : data.PeriodFrom,
        PeriodTo : data.PeriodTo,
        NumberOfPasses : data.NumberOfPasses,
        PassIndex : data.PassesList[i].PassIndex,
        PassID : data.PassesList[i].PassID,
        StationID : data.PassesList[i].StationID,
        TimeStamp : data.PassesList[i].TimeStamp,
        VehicleID : data.PassesList[i].VehicleID,
        Charge : data.PassesList[i].Charge
      };
      new_data.push(pass);
    }
    converter.json2csv(new_data, (err, csv) => {
      if (err) {
        res.status(500).send("Internal error while converting response to csv format");
        throw err;
      }
      res.status(status).send(csv);
    });
  }
  else if (format === "json" || format === undefined) {
    res.status(status).send(data);
  }
  else res.status(400).send("Unable to process request. Query variable format should be {json|csv}");
}
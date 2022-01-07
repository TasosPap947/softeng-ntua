const protocol = "http";
const host = "localhost";
const port = 9103;

const baseURL = `${protocol}://${host}:${port}/interoperability/api`;

const usage = "\nUsage: se2117 <scope> --param1 <value1> [--param2 <value2> ...] --format <fff>";

module.exports = { baseURL, usage };

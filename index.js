const OTCatchup = require("./OTCatchup");

let stale = "";
let latest = "Hello, human!";
let otjson = '[{"op": "insert", "chars": "Hello, human!"}]';
OTCatchup(stale, latest, otjson);
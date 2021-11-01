const OTCatchup = require("./OTCatchup");

let stale = "";
let latest = "Hello, human!";
let otjson = '[{"op": "insert", "chars": "Hello, human!"}]';
let isValid = OTCatchup(stale, latest, otjson);

console.log("Transformation was ", (isValid) ? " Valid " : " Not Valid");
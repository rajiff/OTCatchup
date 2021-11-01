const OTCatchup = require("./OTCatchup");
const expect = require("chai").expect;

describe("Operational Transformation test scenarios to validate transformation", function(){

  it("Transformation by insert on empty string", function() {
    let isValid = OTCatchup(
      '',
      'Hello, human!',
      '[{"op": "insert", "chars": "Hello, human!"}]'
    );
    expect(isValid).equals(true);
  }); // end of it

  it("Series transformation of skip and insert", function() {
    let isValid = OTCatchup(
      "Nice!",
      "Nice day!",
      '[{"op": "skip", "count": 4}, {"op": "insert", "chars": " day"}]'
    );
    expect(isValid).equals(true);
  }); // end of it

  it("Sample delete operation", function() {
    let isValid = OTCatchup(
      "What is up?",
      "What is?",
      '[{"op": "skip", "count": 7}, {"op": "delete", "count": 3}]'
    );
    expect(isValid).equals(true);
  }); // end of it

  it("Scenario delete operation", function() {
    let isValid = OTCatchup(
      'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
      'Repl.it uses operational transformations.',
      '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}]'
    );
    expect(isValid).equals(true);
  }); // end of it

  it("Handle delete past end of string", function() {
    let isValid = OTCatchup(
      'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
      'Repl.it uses operational transformations.',
      '[{"op": "skip", "count": 45}, {"op": "delete", "count": 47}]'
    );
    expect(isValid).equals(false); // transformation will not matching 
  }); // end of it

  it("Handle skip past end of string", function() {
    let isValid = OTCatchup(
      'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
      'Repl.it uses operational transformations.',
      '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}, {"op": "skip", "count": 2}]'
    );
    expect(isValid).equals(false); // this scenario seems to be having invlaid assert condition it should be 'true', it should not apply transformation after last delete, unless we are comparing cursor position too
  }); // end of it

  it("Handle skip past end of string with insert", function() {
    let isValid = OTCatchup(
      'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
      'Repl.it uses operational transformations.',
      '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}, {"op": "skip", "count": 2}, {"op": "insert", "chars": "END"}]'
    );
    expect(isValid).equals(true); // it should not apply the transformation after last delete,  which it is doing
  }); // end of it

  it("Handle series of operations", function() {
    let isValid = OTCatchup(
      'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
      'We use operational transformations to keep everyone in a multiplayer repl in sync.',
      '[{"op": "delete", "count": 7}, {"op": "insert", "chars": "We"}, {"op": "skip", "count": 4}, {"op": "delete", "count": 1}]'
    );
    expect(isValid).equals(true);
  }); // end of it

  it("Handle empty series of operations", function() {
    let isValid = OTCatchup(
      'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
      'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
      '[]'
    );
    expect(isValid).equals(true);
  }); // end of it

}); // end of test scenarios
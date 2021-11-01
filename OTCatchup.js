const opInsert = function(insertAtPos, str, {chars}) {
  let newStr = "";
  // insert at specified position
  newStr = str.slice(0, insertAtPos) + chars + str.slice(insertAtPos);

  // Move the cursor to end of the end of inserted char 
  let nextPos = str.slice(0, insertAtPos).length + chars.length;

  return {trStr: newStr, cursorPos: nextPos};
}

const opSkip = function(startPos, str, {count}) {
  if( (startPos + count) > str.length) {
    // You can't skip past the end of a string
    // cannot apply the transformation, it is unknown how to handle it
    // return back without transformation
    return {trStr: str, cursorPos: startPos, error: `Invalid skip transform `};
  }
  // skip is about moving the cursor only by the specifid count
  let nextPos = startPos + count;

  return {trStr: str, cursorPos: nextPos};
}

const opDelete = function(startPos, str, {count}) {
  if( (startPos + count) > str.length) {
    // You can't delete past the end of a string
    // cannot apply the transformation, it is unknown how to handle it
    // return back without transformation
    return {trStr: str, cursorPos: startPos, error: `Invalid delete transform `};
  }

  // form new string by skipping specified number of chars fromt he specified position
  let newStr = str.slice(0, startPos) + str.slice((startPos + count));
  
  // Delete operations are applied forward while keeping the cursor in place
  // i.e., for delete, the cursor stays where delete was started from
  let nextPos = startPos;
  
  return {trStr: newStr, cursorPos: nextPos};
}

const OT_OPERATIONS = {
  "insert": opInsert,
  "skip": opSkip,
  "delete": opDelete
}

module.exports = function isValid(stale, latest, otjson) {
  // this is the part you will write!
  let otOperations = "";
  let isValid = false;
  
  try {
    otOperations = JSON.parse(otjson);
  } catch (ex) {
    console.log("Exception in parsing JSON ", ex);
    return isValid;
  }

  // starting positions for the transformation
  let trStr = stale;
  let cursorPos = 0; // assuming to be initialised at starting of the string

  let nbrOfOTs = 0;
  for(let i=0; i < otOperations.length; i++) {
    operation = otOperations[i];

    let otClosure = OT_OPERATIONS[operation.op];
    if(otClosure) {
      ({trStr, cursorPos, error} = otClosure(cursorPos, trStr, operation));

      if(error) {
        console.log(`Transformation operation ${operation.op} not applied`);
        break;
      }

      ++nbrOfOTs;
    } else {
      console.log(`Unrecorgnised operation ${operation.op}`);
    }
  }

  // console.log(`Completed applying ${nbrOfOTs} operations to produce [${trStr}]`);
  // console.log(`Valid ? ${trStr} == ${latest}`);

  isValid = (trStr == latest);

  return isValid;
}

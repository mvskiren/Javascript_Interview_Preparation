JSON.parse = function (value) {
  let val = typeof value;
  switch (val) {
    case "null":
      return null;
    case "[]":
      return [];
    case "{}":
      return {};
    case "true":
      return true;
    case "false":
      return false;
    default:
      if (+value === +value) {
        return Number(value);
      } // if escaped single quotes, throw error
      // if escaped single quotes, throw error
      else if (value[0] === "'") {
        throw new Error();
      }
      // if escaped double quotes, throw error
      else if (value[0] === '"') {
        // same as string.substr(1, string.length-2);
        return value.slice(1, -1);
      } else {
        const innerString = value.slice(1, -1);
        // console.log(innerString, 'innerString');
        let substrings = stringSplitByComma(innerString);

        if (value[0] === "[") {
          console.log("entered");
          return substrings.map((item) => JSON.parse(item));
        } else if (value[0] === "{") {
          // if it object
          // get the key and value by splitting on :
          // parse the key and value individually

          return substrings.reduce((acc, item) => {
            if (item.indexOf(":") > -1) {
              const index = item.indexOf(":");
              const thisKey = item.substring(0, index);
              const thisValue = item.substring(index + 1);
              acc[JSON.parse(thisKey)] = JSON.parse(thisValue);
            }
            return acc;
          }, {});
        }
      }
  }
};

function stringSplitByComma(str) {
  let lParen = 0,
    lCurly = 0;
  let left = 0,
    right = 0;

  let allStr = [];

  while (right <= str.length) {
    const rChar = str[right];

    if (rChar === "[") lParen++;
    if (rChar === "]") lParen--;
    if (rChar === "{") lCurly++;
    if (rChar === "}") lCurly--;

    if ((rChar === "," && lCurly == 0 && lParen == 0) || str.length === right) {
      let string = str.substring(left, right);
      allStr.push(string);
      left = right + 1;
    }
    right = right + 1;
  }
  return allStr;
}

console.log(JSON.parse("[]"));
console.log(JSON.parse('[{"x": 5,"y": 6}]'));

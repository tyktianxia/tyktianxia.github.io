// import * as test from "nice-tools-js"

let { isDef, isUndef } = require("nice-tools-js");

if (isDef(null)) {
  console.log("1");
} else {
  console.log("0");
}

if (isUndef(null)) {
  console.log("1");
} else {
  console.log("0");
}

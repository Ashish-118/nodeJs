const fs = require('fs');


// blocking

// console.log("1")
// const result = fs.readFileSync("./example.txt", "utf-8");
// console.log(result);
// console.log("2")

// non-blocking

console.log("1")
fs.readFile("./example.txt", "utf-8", (err, result) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log(result);
    }
});
console.log("2")
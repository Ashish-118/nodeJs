const fs = require("fs");

// fs.writeFileSync("example.txt", "This is an example file.");

//async
// fs.writeFile("./example.txt", "This is an example file. for async", (err) => {
//     if (err) throw err;
//     console.log("File has been created.");
// });

// const result = fs.readFileSync("./example.txt", "utf-8");
// console.log(result);


// fs.readFile("./example.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log("Error", err);
//     }
//     else {
//         console.log(result);
//     }
// })

// to append

// fs.appendFileSync("./example.txt", "\n This is appended text.");

// to copy one file to another

// fs.cpSync("./example.txt", "./exampleCopy.txt");

// to remove a file 
// fs.unlinkSync("./exampleCopy.txt");

//to get the stats of a file

const stats = fs.statSync("./example.txt");
console.log(stats);
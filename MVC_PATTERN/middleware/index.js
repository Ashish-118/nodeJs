const fs = require('fs');

const logRequests = (fileName) => {
    return (req, res, next) => {
        fs.appendFile(`${fileName}.txt`, `Requested URL: ${req.url}, Method: ${req.method}, Date: ${new Date().toISOString()} \n`, (err) => {
            if (err) {
                console.log("Error writing to log file", err);
            }
            next();
        })

    }
}


module.exports = { logRequests };
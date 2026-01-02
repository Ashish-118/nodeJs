const http = require("http");
const fs = require("fs");
const url = require("url");
const server = http.createServer((req, res) => {
    // const myUrl = url.parse(req.url);
    const myUrl = url.parse(req.url, true); // means to parse the query as well
    console.log(myUrl);
    // const name = myUrl.query?.split('=')[1];// creates a list of strings
    const name = myUrl.query.name;
    console.log(name);
    if (req.method == 'GET') {
        console.log('This is a GET request');
    }
    switch (myUrl.pathname) {
        case '/':
            res.end('homepage');
            break;

        case '/about':

            res.end(`My name is ${name ? name : 'Ashish'}`);
            break;

        default:
            res.end('404 page not found');
    }

    const log = `\nRequest received at ${Date.now()} and URL is ${req.url}`;
    fs.appendFile("log.txt", log, (err, data) => {
        if (err) {
            res.end("Error writing to log file", err);
        }
        res.end('Hello, World!');
    })
})
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})
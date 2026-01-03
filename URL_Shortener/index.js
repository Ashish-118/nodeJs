const express = require('express');
const { connectDB } = require('./lib/connect');
const path = require('path');
const route = require('./routes/route');
const staticRoute = require('./routes/staticRouter');


const app = express();
const PORT = 8000;

connectDB();
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use('/', staticRoute);
app.use('/url', route);



// app.get('/test', async (req, res) => {
//     const all_urls = await Url.find({});
//     return res.render('home', {
//         urls: all_urls
//     });
// })


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
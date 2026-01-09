const express = require('express');
const ejs = require('ejs');
const path = require('path');
const userRoutes = require('./routes/user');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.get('/', (req, res) => {
    res.render('home');
})

app.use('/users', userRoutes);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



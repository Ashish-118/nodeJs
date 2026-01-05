const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads"); // make sure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/', (req, res) => {
    res.render('home');
});

app.post("/upload", upload.single("fileName"), (req, res) => {
    console.log("Controller called");
    console.log(req.file);   // uploaded file info
    res.send("File uploaded successfully");
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const express = require('express');
const mongoose = require('mongoose');
const data = require('./MOCK_DATA.json');
const fs = require("fs");
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
    console.log("custome middleware 1");
    req.greetings = "Hello from middleware1";
    next();
})
app.use((req, res, next) => {
    console.log("custome middleware 2", req.greetings);
    next();
})

app.use((req, res, next) => {
    fs.appendFile('log.txt', `Requested URL: ${req.url}, Method: ${req.method}, Date: ${new Date().toISOString()} \n`, (err) => {
        if (err) {
            console.log("Error writing to log file", err);
        }
        next();
    })
})

// connecting to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB", err));

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job_title: {
        type: String
    },
    gender: {
        type: String
    }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema);

app.get('/api/users', (req, res) => {
    console.log("This is the headers coming with request from client ", req.headers);
    console.log("message from middleware:", req.greetings);// to access the data from middleware
    res.setHeader('X-myName', 'Ashish');
    return res.json(data);
});


// app.get('/users', (req, res) => {
//     const html = `
//   <ul>
//   ${data.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
//   </ul>
//   `
//     return res.send(html);
// });
app.get('/users', async (req, res) => {
    const users = await userModel.find({});
    const html = `
  <ul>
  ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
  </ul>
  `
    return res.send(html);
});


app.get('/api/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    let foundUser = data.find(user => user.id === userId);


    return res.json(foundUser);

});
//--- for same route we can have multiple methods
// app.get('/users/:id', (req, res) => { });
// app.patch('/users/:id', (req, res) => { });
// app.delete('/users/:id', (req, res) => { });
// app.post('/users/:id', (req, res) => { });

// instead of this we can use route method
// app.route('/users/:id')
//     .get((req, res) => { })
//     .patch((req, res) => { })
//     .delete((req, res) => { })
//     .post((req, res) => { });

//-------------------------------------------------------
// app.post('/api/users', (req, res) => {
//     //create new user
//     let user = req.body;
//     console.log(user);
//     data.push({ ...user, id: data.length + 1 });
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error writing file' });
//         }
//     })
//     return res.json({ status: 'User created successfully' });
// })

app.patch('/api/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    const foundUser = data.findIndex(user => user.id === userId);
    if (foundUser === -1) {
        return res.status(404).json({ status: "User not found" });
    }

    const { first_name } = req.body;
    if (!first_name) {
        return res.status(400).json({ error: "first_name is required" });
    }

    data[foundUser].first_name = first_name;

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error writing file' });
        }
        return res.json({ status: 'User updated successfully' });
    });
});


app.post('/api/users', async (req, res) => {
    const userData = req.body;

    if (!userData || !userData.first_name || !userData.last_name || !userData.email || !userData.job_title || !userData.gender)
        return res.status(400).json({ error: "All fields are required" });


    const createdUser = await userModel.create({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        job_title: userData.job_title,
        gender: userData.gender
    })

    console.log('createdUser:', createdUser);

    return res.status(201).json({ message: "User created successfully", user: createdUser });
})





app.listen(port, () => console.log(`Server is running on port ${port}`));
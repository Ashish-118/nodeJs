const express = require('express');
const { connectDB } = require('./connection');
const userRouter = require('./routes/user')
const { logRequests } = require('./middleware');
const app = express();
const port = 8000;

// connect to database
connectDB();

//middleware
app.use(logRequests('server_requests'));
app.use(express.urlencoded({ extended: false }));


//routes
app.use('/users', userRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));

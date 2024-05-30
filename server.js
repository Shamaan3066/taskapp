const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT;
const allowedOrigin = process.env.ALLOWED_ORIGINS;

//Middlewares
app.use(express.json());
app.use(cors({
    origin: [allowedOrigin, 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT']
}))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( {policy: 'cross-origin'} ));

app.get('/', (req, res) => {
    res.send(`Welcome to Task Management App - TaskTrackr`);
})

//Routes
app.use('/auth', userRoutes);
app.use('/tasks', taskRoutes);

//Connect DB
const url = process.env.MONGODB_URL;
mongoose.connect(url);
const connection = mongoose.connection;
connection.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
    console.log('DB connected');
})

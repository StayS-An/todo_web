require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const db = require('./models/index');
const cors = require('cors');
const router = require('./routes/index');
const errorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
const morgan = require('morgan');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

// function next dont use, that it's last middleware
app.use(errorHandlingMiddleware);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Working'
    })
})

const start = async () => {
    try {
        await sequelize.authenticate();

        app.listen(PORT, () => console.log(`Server started ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start();
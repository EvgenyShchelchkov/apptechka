const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const medkitRouter = require('./routes/medkit.router');
const medicineRouter = require('./routes/medicine.router');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/medkits', medkitRouter);
app.use('/api/medicines', medicineRouter);

module.exports = app;

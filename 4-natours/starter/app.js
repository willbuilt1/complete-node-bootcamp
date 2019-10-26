const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes')

const express = require('express');
const morgan = require('morgan');

const app = express();


//MIDDLEWARE

// Testing writing own middleware
const timeRequested = (req, res, next) => {
    req.timeRequested = new Date().toISOString();

    next();
}

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.static(`${__dirname}/public`))
app.use(timeRequested)


//ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;
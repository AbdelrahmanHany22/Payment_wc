const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

//security dependencies
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const stripeRouter = require('./routes/stripeRoutes')

const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());


// limiting api calls to avoid DDOS
const limiter = rateLimit({
    max: 100,
    windowMS: 60 * 60 * 1000,
    message: 'Too many requests from this IP.'
});
app.use(limiter);

//routes
app.use('/api/v1/payment', stripeRouter)

//undefined routes handling
app.all('*', (req,res,next)=>{
    next(new AppError(`the url ${req.originalUrl} doesnt exist`,404));
});
app.use(globalErrorHandler);

module.exports = app;
const express = require('express');
const app = express();

const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorMiddleware = require('./middlewares/errors');
const ErrorHandler = require('./utils/errorHandler');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser');


// config path env
dotenv.config({path: './.env'});

// Handling uncaught exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down due to uncaught exception.`);
    process.exit(1);
});

connectDB();

app.use(bodyParser.urlencoded({ extended : true }));// Set up body parser
app.use(helmet()); // Setup security headers
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());  // Sanitize data
app.use(xssClean());// Prevent XSS attacks

// Prevent Parameter Pollution
// app.use(hpp({
//     whitelist: ['positions']
// }));
// Rate Limiting

// const limiter = rateLimit({
//     windowMs: 10*60*1000, //10 Mints
//     max : 100
// });

// Setup CORS - Accessible by other domains
app.use(cors());

// app.use(limiter);


// importing routes
const example = require('./routers/example');
const auth = require('./routers/auth');

app.use('/api/v1', example);
app.use('/api/v1', auth);

// handle unhandled routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} router not found`, 404));
});

// middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`started ${PORT} in ${process.env.NODE_ENV} mode.`);
});

process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to handled promise rejection.`);
    server.close( () => {
        process.exit(1);
    });
});


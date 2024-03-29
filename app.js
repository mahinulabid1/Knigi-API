const express = require('express');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const bodyParser = require('body-parser');
const cookieParser = require ('cookie-parser');

const errorHandler = require("./src/controller/errorController");
const ShopRouter = require('./src/routes/shopItemRoute');
const UserRouter = require('./src/routes/userRoute')
const BlogRouter = require('./src/routes/blogRoute')


const limiter = rateLimit({
   max: 100,
   windowMs: 60 * 60 * 1000,
   message: 'Too many requests from this IP, please try again in an hour!'
})

// a custom function to rollback(delete uploaded photo) photo when there is an error when uploading
const uploadRollBackConfig = (req, res, next) => {
   req.isFileUploaded = {
      status: false,
      publicIdArr : []
   }
   next();
}

// app.enable('trust proxy');
app.use('/api', limiter);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize()); // parse body before these three, parse data before security
app.use(xss());
app.use(hpp());
app.use(uploadRollBackConfig);

// Routes
app.use('/api/v1', ShopRouter);
app.use('/api/v1', UserRouter);
app.use('/api/v1', BlogRouter);


app.use('*', ( req, res) =>{
   res.status(404).json({
      status: "404 Not Found!",
      message: "No Resources found with this route!"
   })
})

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorHandler);  


module.exports = { app };


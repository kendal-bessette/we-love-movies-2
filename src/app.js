require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const knex = require("./db/connection");


const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router")
const reviewsRouter = require("./reviews/reviews.router")

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");


console.log(process.env.PRODUCTION_DATABASE_URL);

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter); 


// error handlers 
app.use(notFound);
app.use(errorHandler);





module.exports = app;
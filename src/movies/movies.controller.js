const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const knex = require("knex");

async function list(req, res, next) {
    const data = await service.list(req.query.is_showing); 
    res.json({ data });
};

async function read(req, res, next) {
    res.json({ data: res.locals.movie });
};

async function doesMovieExist(req, res, next) {
    const movie = await service.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie
        return next()
    }
    return next({
        status: 404, message: `Movie does not exist for id: ${req.params.movieId}`
    });
};

async function getTheatersByMovieId(req, res, next) {
    const data = await service.listTheatersByMovieId(Number(req.params.movieId))
    res.json({ data }); 
}; 

async function getReviewsByMovieId(req,res,next) {
    const data = await service.listReviewsByMovieId(Number(req.params.movieId))
    res.json({ data }); 
}; 


module.exports = {
    read: [doesMovieExist, read],
    list: asyncErrorBoundary(list),
    getTheatersByMovieId: [doesMovieExist, asyncErrorBoundary(getTheatersByMovieId)],
    getReviewsByMovieId: [doesMovieExist, asyncErrorBoundary(getReviewsByMovieId)],   

}
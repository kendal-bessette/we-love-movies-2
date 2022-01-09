function notFound(req, res, next) {
    next({ status: 404, message: `cannot be found` });
  }
  
  module.exports = notFound;
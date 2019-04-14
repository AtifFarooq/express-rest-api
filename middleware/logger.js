const moment = require('moment');
// A 'middleware' function
// Will run whenever a request is made
const logger = (req, res, next) => {
    // Log the URL and the date
    console.log(
      `${req.protocol}://${req.get("host")}${
        req.originalUrl
      }: ${moment().format()}`
    );
    next();
  };

  module.exports = logger;
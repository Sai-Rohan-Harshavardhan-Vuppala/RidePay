const requestLogger = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("-------------------------------------");
  console.log(`[ ${req.requestTime} ]`);
  console.log(`${req.method} - ${req.url}`);
  console.log(req.body);
  console.log("-------------------------------------");

  next();
};

module.exports = requestLogger;

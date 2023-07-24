const jwt = require("jsonwebtoken");
const config = require("config");
const { registerSchema, loginSchema, businessSchema } = require("./Validations");
const { formatDateTime } = require("./helpers")

module.exports.userValidate = (req, res, next) => {
  if (req.baseUrl === "/user") {
    req.path === "/login" ? (schema = loginSchema) : (schema = registerSchema);
  } else {
    schema = businessSchema;
  }
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json(error.details.map((msg) => msg.message));
  } else {
    next();
  }
};

module.exports.userAuthenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  jwt.verify(authHeader, config.get("ACCESS_TOKEN_SECRET"), (err, user) => {
    if (err) return res.status(403).json(`Your token was expired at ${formatDateTime(err.expiredAt)}`);
    req.user = user;
    next();
  });
};



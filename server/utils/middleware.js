const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");
const { registerSchema, loginSchema, businessSchema, emailSchema } = require("./validations");
const { formatDateTime } = require("./helpers")

module.exports.userValidate = (req, res, next) => {
  if (req.baseUrl === "/user") {
    req.path === '/' ? schema = emailSchema : req.path === "/login" ? schema = loginSchema : schema = registerSchema;
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
    if (err) {
      return (err.name === "TokenExpiredError") ?
        res.status(403).json(`Your token was expired at ${formatDateTime(err.expiredAt)}`) :
        res.sendStatus(403)
    }
    user.sub = user.sub.toLowerCase()
    req.user = user;
    next();
  });
};

module.exports.userPermission = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.sub });
  if (!user) return res.status(404).json(`User doesn't exist`);
  if (req.baseUrl === "/user") {
    if (!user.admin) return res.status(404).json("Must be an admin account");
  } else {
    if (!user.business) return res.status(403).json("Must be a business account");
  }
  req.user = user
  next();
};




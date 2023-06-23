const jwt = require("jsonwebtoken");
const config = require("config");
const { registerSchema, loginSchema, businessSchema } = require("./Validations");

module.exports.userValidate = (req, res, next) => {
  if (req.baseUrl === "/user") {
    req.path === "/register" ? (schema = registerSchema) : (schema = loginSchema);
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
  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.get("ACCESS_TOKEN_SECRET"), (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Dependencies

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const config = require("config");
const User = require("../models/user");
const { userValidate, userAuthenticate } = require("../utils/middleware");
const jwt = require("jsonwebtoken");

// Endpoints

router.delete("/init", async (req, res) => {
  try {
    const reset = await User.deleteMany();
    if (!reset.deletedCount) return res.status(404).send("There are no registered users");
    res.status(200).send(`Number of users that's been removed: ${reset.deletedCount}`);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.delete("/:id",/* userAuthenticate,*/ async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) return res.status(404).send("User doest exist");
    res.status(200).send("User been deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/register", userValidate, async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(_.pick(user, ["_id", "firstName", "email", "business"]));
  } catch (error) {
    if (error.message.includes("email")) return res.status(400).json("Email already exists");
    if (error.message.includes("userName")) return res.status(400).json("User name already exists");
    res.status(400).json(error.message);
  }
});

router.post("/login", userValidate, async (req, res) => {
  try {
    let findUser = await User.findOne({ email: req.body.email });
    if (!findUser) return res.status(404).json("Email doest exist");
    if (await bcrypt.compare(req.body.password, findUser.password)) {
      const iat = Math.floor(Date.now() / 1000);
      const exp = iat + 60 * 60;
      const payload = {
        sub: req.body.email,
        iat: iat,
        exp: exp,
      };
      const token = jwt.sign(payload, config.get("ACCESS_TOKEN_SECRET"));
      findUser = findUser.toObject();
      findUser.token = token;
      res.status(200).json(_.pick(findUser, ["_id", "business", "token", 'userName']));
    } else res.status(400).send("Incorrect password");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

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

router.delete("/:id", userAuthenticate, async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) return res.status(404).send("User doest exist");
    res.status(200).json("User been deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/register", userValidate, async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(_.pick(user, ["_id", "userName", "email", "business", "admin"]));
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
    const currentTime = Date.now();
    const lastFailedAttemptTime = findUser.lastFailedAttempt || 0;
    const hoursSinceLastFailedAttempt = Math.floor((currentTime - lastFailedAttemptTime) / (1000 * 60 * 60));
    if (findUser.loginAttempts >= 3 && hoursSinceLastFailedAttempt < 24) {
      return res.status(403).json("Account is locked. Please contact support.");
    }
    if (await bcrypt.compare(req.body.password, findUser.password)) {
      findUser.loginAttempts = 0;
      findUser.lastFailedAttempt = undefined;
      await findUser.save()
      const iat = Math.floor(Date.now() / 1000);
      // const exp = iat + 5;
      const exp = iat + 60 * 30;
      const payload = {
        sub: req.body.email,
        iat: iat,
        exp: exp,
      };
      const token = jwt.sign(payload, config.get("ACCESS_TOKEN_SECRET"));
      findUser = findUser.toObject();
      findUser.token = token;
      res.status(200).json(_.pick(findUser, ["_id", "business", "admin", "token", "userName"]));
    } else {
      res.status(400).send("Incorrect password");
      findUser.loginAttempts += 1;
      findUser.lastFailedAttempt = currentTime;
      await findUser.save()
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/", userAuthenticate, async (req, res) => {
  try {
    const usersDetails = await User.find();
    if (!usersDetails) return res.status(404).send("Users doest exist");
    const filteredDetails = usersDetails.map((user) => {
      return (_.pick(user, ["_id", "userName", "email", "business", "admin"]));
    });
    res.status(200).json(filteredDetails);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", userAuthenticate, async (req, res) => {
  try {
    const userDetails = await User.findById(req.params.id).select('-password');
    if (!userDetails) return res.status(404).send("User doest exist");
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", userAuthenticate, async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!updateUser) return res.status(404).json("User doest exist");
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

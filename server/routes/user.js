// Dependencies

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const config = require("config");
const User = require("../models/user");
const { userValidate, userAuthenticate, userPermission } = require("../utils/middleware");
const { extractMsg } = require("../utils/helpers")
const jwt = require("jsonwebtoken");

// Endpoints

router.delete("/init", async (req, res) => { /*Postman use case*/
  try {
    const reset = await User.deleteMany();
    if (!reset.deletedCount) return res.status(404).send("There are no registered users");
    res.status(200).send(`Number of users that's been removed: ${reset.deletedCount}`);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/register", userValidate, async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(_.pick(user, ["userName"]));
  } catch (error) {
    res.status(400).json(extractMsg(error.message));
  }
});

router.post("/login", userValidate, async (req, res) => {
  try {
    let findUser = await User.findOne({ email: req.body.email });
    if (!findUser) return res.status(404).json(`Email doesn't exist`);
    const currentTime = Date.now();
    const lastFailedAttemptTime = findUser.lastFailedAttempt || 0;
    const hoursSinceLastFailedAttempt = Math.floor((currentTime - lastFailedAttemptTime) / (1000 * 60 * 60));
    if (findUser.loginAttempts >= 3 && hoursSinceLastFailedAttempt < 24) {
      return res.status(403).json("Your Account Has Been Temporarily Locked");
    }
    if (await bcrypt.compare(req.body.password, findUser.password)) {
      findUser.loginAttempts = 0;
      findUser.lastFailedAttempt = undefined;
      await findUser.save()
      const iat = Math.floor(Date.now() / 1000);
      // const exp = iat + 5
      const exp = iat + 60 * 240;
      const payload = { sub: req.body.email, iat: iat, exp: exp };
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

router.get("/:id", userAuthenticate, async (req, res) => {
  try {
    const userDetails = await User.findById(req.params.id).select('-password');
    if (!userDetails) return res.status(404).json(`User doesn't exist`);
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/", userAuthenticate, userPermission, async (req, res) => {
  try {
    const usersDetails = await User.find();
    const filteredDetails = usersDetails.map((user) => {
      return (_.pick(user, ["_id", "userName", "email", "business", "admin"]));
    });
    res.status(200).json(filteredDetails);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


router.put("/:id", userAuthenticate, userValidate, async (req, res) => {
  try {
    if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 10);
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updateUser) return res.status(404).json(`User doesn't exist`);
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(400).json(extractMsg(error.message));
  }
});

router.patch("/:id", userAuthenticate, userPermission, async (req, res) => {
  try {
    console.log(req.body.admin);
    const { business } = req.body;
    const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: { business } }, { new: true, runValidators: true });
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete("/:id", userAuthenticate, async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) return res.status(404).json("User doest exist");
    res.status(200).json("User been deleted");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

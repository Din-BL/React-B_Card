// Dependencies

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const config = require("config");
const User = require("../models/user");
const Business = require("../models/business");
const { userValidate, userAuthenticate, userPermission } = require("../utils/middleware");
const { extractMsg, generatePassword } = require("../utils/helpers")
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'din.bl.fullstack@gmail.com',
    pass: 'crnwhigrlgwrshsb'
  }
});

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
    if (user.admin) {
      if (!user.business) {
        user.business = true
        await user.save();
      }
    }
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
      const exp = iat + 60 * 240;
      const payload = { sub: req.body.email, iat: iat, exp: exp };
      const token = jwt.sign(payload, config.get("ACCESS_TOKEN_SECRET"));
      findUser = findUser.toObject();
      findUser.token = token;
      res.status(200).json(_.pick(findUser, ["_id", "business", "admin", "token", "userName", "imageUrl"]));
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
    if (req.user.sub !== req.body.email) return res.status(400).json(`Email must be ${req.user.sub}`);
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
    const { business } = req.body;
    await User.findByIdAndUpdate(req.params.id, { $set: { business } }, { new: true, runValidators: true });
    const deletedBusinesses = await Business.find({ user_id: req.params.id });
    deletedBusinesses && await Business.deleteMany({ user_id: req.params.id });
    res.status(201).json(deletedBusinesses);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.patch("/", userValidate, async (req, res) => {
  try {
    let findUser = await User.findOne({ email: req.body.email });
    if (!findUser) return res.status(404).json(`Email doesn't exist`);
    const newPassword = generatePassword()
    findUser.password = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(findUser._id, findUser, { new: true, runValidators: true });

    const mailOptions = {
      from: 'din.bl.fullstack@gmail.com',
      to: req.body.email,
      subject: 'B-Card - reset password',
      html: `
      <p>Your new password is: <strong>${newPassword}</strong></p>
      <img style="height: 150px; width: 150px;"
      src="https://st2.depositphotos.com/5142301/12319/v/950/depositphotos_123199778-stock-illustration-letter-b-logo-at-blue.jpg" alt="B-Card Logo" />`
    }
    transporter.sendMail(mailOptions, (error, info) => {
      return error ? res.status(500).json('Failed to send email') : res.status(201).json(findUser.email);
    });
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

router.delete("/:id/admin", userAuthenticate, userPermission, async (req, res) => {
  try {
    const findBusinesses = await Business.find({ user_id: req.params.id });
    if (!findBusinesses) return res.status(404).json(`No registered businesses`);
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(findBusinesses);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

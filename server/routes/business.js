// Dependencies

const express = require("express");
const router = express.Router();
const Business = require("../models/business");
const User = require("../models/user");
const { userValidate, userAuthenticate } = require("../utils/middleware");

// Endpoints

router.delete("/init", async (req, res) => {
  try {
    const reset = await Business.deleteMany();
    if (!reset.deletedCount) return res.status(404).send("There are no registered businesses");
    res.status(200).send(`Number of Businesses that's been removed: ${reset.deletedCount}`);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/", userAuthenticate, userValidate, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.sub });
    if (!user) return res.status(404).json("User doest exist");
    if (!user.business) return res.status(403).json("Must be a business owner");
    const business = new Business(req.body);
    business.user_id = user.id;
    await business.save();
    res.status(201).json(business);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/:id", userAuthenticate, async (req, res) => {
  try {
    const findBusiness = await Business.findById(req.params.id);
    if (!findBusiness) return res.status(404).json("Business doest exist");
    res.status(200).json(findBusiness);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put("/:id", userAuthenticate, async (req, res) => {
  try {
    const updateBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updateBusiness) return res.status(404).json("Business doest exist");
    res.status(201).json(updateBusiness);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete("/:id", userAuthenticate, async (req, res) => {
  try {
    const deleteBusiness = await Business.findByIdAndDelete(req.params.id);
    if (!deleteBusiness) return res.status(404).send("Business doest exist");
    res.status(200).json("Business been deleted");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("", userAuthenticate, async (req, res) => {
  try {
    const userInfo = await User.findOne({ email: req.user.sub });
    if (!userInfo) return res.status(404).json("User doest exist");
    const findBusinesses = await Business.find({ user_id: userInfo.id });
    if (!findBusinesses) return res.status(404).json("User has no registered businesses");
    res.status(200).json(findBusinesses);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

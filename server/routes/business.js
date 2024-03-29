// Dependencies

const express = require('express');
const router = express.Router();
const Business = require('../models/business');
const {userValidate, userAuthenticate, userPermission} = require('../utils/middleware');

// Endpoints

router.delete('/init', async (req, res) => {
  /*Postman use case*/
  try {
    const reset = await Business.deleteMany();
    if (!reset.deletedCount) return res.status(404).send('There are no registered businesses');
    res.status(200).send(`Number of Businesses that's been removed: ${reset.deletedCount}`);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post('/', userAuthenticate, userValidate, userPermission, async (req, res) => {
  try {
    if (req.user.email !== req.body.email) return res.status(400).json(`Email must be ${req.user.email}`);
    const business = new Business(req.body);
    business.user_id = req.user.id;
    await business.save();
    res.status(201).json(business);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put('/:id', userAuthenticate, userValidate, userPermission, async (req, res) => {
  try {
    if (req.user.email !== req.body.email) return res.status(400).json(`Email must be ${req.user.email}`);
    const updateBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (!updateBusiness) return res.status(404).json(`Business doesn't exist`);
    res.status(201).json(updateBusiness);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('', userAuthenticate, userPermission, async (req, res) => {
  try {
    const findBusinesses = await Business.find({user_id: req.user.id});
    if (!findBusinesses) return res.status(404).json(`No registered businesses`);
    res.status(200).json(findBusinesses);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/all', async (req, res) => {
  try {
    const findBusinesses = await Business.find();
    if (!findBusinesses) return res.status(404).json(`No registered businesses`);
    res.status(200).json(findBusinesses);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/:id', userAuthenticate, userPermission, async (req, res) => {
  try {
    const findBusiness = await Business.findById(req.params.id);
    if (!findBusiness) return res.status(404).json(`Business doesn't exist`);
    res.status(200).json(findBusiness);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete('/:id', userAuthenticate, userPermission, async (req, res) => {
  try {
    const deleteBusiness = await Business.findByIdAndDelete(req.params.id);
    if (!deleteBusiness) return res.status(404).json(`Business doesn't exist`);
    res.status(200).json(deleteBusiness);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

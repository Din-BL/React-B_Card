// Dependencies

const express = require("express");
const router = express.Router();
const { DefaultCards } = require("../models/business");
const User = require("../models/user");
const fs = require("fs");
const { userAuthenticate } = require("../utils/middleware");

// Endpoints

router.post("/init", (req, res) => {
    try {
        fs.readFile("./seeds/businessCards.json", "utf8", async (err, data) => {
            if (err) res.json(err);
            else {
                await DefaultCards.deleteMany({});
                const cardsData = JSON.parse(data);
                await DefaultCards.insertMany(cardsData.businessCards);
                res.status(200).json('Inserted default Cards')
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("", /*userAuthenticate,*/ async (req, res) => {
    try {
        // const userInfo = await User.findOne({ email: req.user.sub });
        // if (!userInfo) return res.status(404).send("User doest exist");
        const findBusinesses = await DefaultCards.find({});
        if (!findBusinesses) return res.status(404).send("User has no registered business");
        res.status(200).json(findBusinesses);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
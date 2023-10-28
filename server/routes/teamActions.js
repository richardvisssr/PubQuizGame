const express = require("express");
const mongoose = require("../utils/databaseConnection");
const { MongoClient } = require("mongodb");
const router = express.Router();

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const teamSchema = new mongoose.Schema({
    teamId: String,
    name: String,
    score: Number
})

const Team = mongoose.model("team", teamSchema);

router.put("/teams", async (req, res) => {
    try {
        const { teamId, name, score } = req.body;
        const newTeam = new Team({
            teamId: teamId,
            name: name,
            score: score
        });
        await newTeam.save();
        res.status(200).json({ message: "Team created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
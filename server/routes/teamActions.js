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

        if (name != null){
            const team = await Team.findOne({ name: name });
            if (team){
                res.status(409).json({ message: "Team name already exists" });
                return;
            } else {
                const newTeam = new Team({
                    teamId: teamId,
                    name: name,
                    score: score
                });
                await newTeam.save();
                res.status(200).json({ message: "Team created successfully" });
            }
        } else {
            res.status(400).json({ message: "Team name is required" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/teams/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTeam = Team.findOneAndDelete({ teamId: id });

        if (deleteTeam) {
            res.status(200).json({ message: "Team deleted successfully" });
        } else {
            res.status(404).json({ message: "Team not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/teams/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { score } = req.body;

        const team = Team.findOneAndUpdate(
            { teamId: id },
            {$inc: {score: score}}
        );

        if (team){
            res.status(200).json({ message: "Score updated successfully" });
        } else {
            res.status(404).json({ message: "Team not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
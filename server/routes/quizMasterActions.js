const express = require("express");
const mongoose = require("../utils/databaseConnection");
const { MongoClient } = require("mongodb");
const router = express.Router();

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const quizSchema = new mongoose.Schema({
    code: String,
    teams: [String],
    rounds: [String],
    questions: [String]
});

const Quiz = mongoose.model("quiz", quizSchema);

router.put("/quizzes", async (req, res) => {
    try {
        const { quizCode } = req.body;
        
        const newQuiz = new Quiz({
            code: quizCode,
            teams: [],
            rounds: [],
            questions: []
        });

        await newQuiz.save();
        res.status(200).json({ message: "Quiz created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/quizzes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteQuiz = await Quiz.findOneAndDelete({ code: id });
        if (deleteQuiz){
            res.status(200).json({ message: "Quiz deleted successfully" });
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/quizzes/:id/:team", async (req, res) => {
    try {
        const { id, teamId} = req.params;

    } catch (error) {
        
    }
});

router.put("/quizzes/:id/:round", async (req, res) => {
    try {
        const { id, round } = req.params;
        const { teams, question } = req.body;

        const quiz = await Quiz.findOne({ code: id });

        if (round == 1){
            quiz.teams = teams;
            quiz.rounds.push(round);
            quiz.questions.push(question);
        } else {
            quiz.rounds.push(round);
            quiz.questions.push(question);
        }

        const saveQuiz = await quiz.save();
        if (saveQuiz){
            res.status(200).json({ message: "Quiz updated successfully" });
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/questions", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("quizzer");
        const collection = db.collection("questions");

        const questions = await collection.find({}).toArray();

        if (questions.length > 0) {
            res.status(200).json({ questions });
        } else {
            res.status(404).json({ message: "No questions found" });
        }

    } catch (error) {
        res.status(500).json({message: "Error retrieving questions"});
    } finally {
        await client.close();
    }
});

module.exports = router;
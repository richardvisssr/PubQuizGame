const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/quizzer");

const quizSchema = new mongoose.Schema({
    teams: [String],
    rounds: [String],
    questions: [String]
});

const Quiz = mongoose.model("quiz", quizSchema);

const quizOne = new Quiz({
    teams: ["Team 1", "Team 2"],
    rounds: ["Round 1", "Round 2"],
    questions: ["Question 1", "Question 2"]
})

quizOne.save(function(err, quizOne) {
    if (err) return console.error(err);
    console.log(quizOne);
});

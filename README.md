[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/nfN6GiDF)

# Webapplicatie Naam

Beschrijving van je webapplicatie en wat het doet.

## Inhoudsopgave

- [Vereisten](#vereisten)
- [Installatie](#installatie)
- [Gebruik](#gebruik)
- [API](#api)
- [Bijdragen](#bijdragen)
- [Licentie](#licentie)

## Ontwerp 

### Quizmaster View

![Alt Text](files\QuizMaster.png)

### Quiz View

![Alt Text](files\Quiz.png)

### Team View

![Alt Text](files\Team.png)

## Database Schema

### Quiz
```json
{
  "_id": UUID,
  "category": [],
  "teams": []
}
```

### Quizmaster
```json
{
  "quizzers": [
    "category": [
        "questions":[
            "question": String,
            "answer": String,
        ]
    ],

  ],
  "teams": [
    "_id": UUID,
  ],
  [
    "verificationCode": Int,
  ]
}
```

### Team

```json
{
  "teams": [
    "_id": UUID,
    "name": String,
  ]
}
```

## Vereisten

- Een lijst met vereiste software, bibliotheken en tools.
- Bijvoorbeeld: Node.js, MongoDB, npm, enz.

## Installatie

1. Instructies voor het clonen van het project.
2. Instructies voor het installeren van afhankelijkheden met `npm install`.
3. Instructies voor het instellen van configuratiebestanden.

```shell
git clone <repository-url>
cd project-map
npm install



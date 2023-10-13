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

## Ontwerp schetsen 

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
## Client ontwerpen

**State Structure**

1. **Teams:**
   - Bewaar informatie over elk team, inclusief hun naam, leden en scores.

2. **Quizzmaster:**
   - Bewaar informatie over de Quizz Master, inclusief hun acties.

3. **Huidige vraag:**
   - Bewaar informatie over de huidige vraag die wordt weergegeven, inclusief de tekst en categorie.

4. **Antwoorden:**
   - Bewaar de antwoorden die door teams zijn ingediend voor de huidige vraag, en associeer ze met het team dat elk antwoord heeft ingediend.

5. **Categorieën:**
   - Bewaar een lijst met beschikbare quizcategorieën.

6. **Ronde informatie:**
   - Houd de huidige ronde bij, het totaal aantal rondes en welke teams de huidige vraag hebben beantwoord.

**Reducers:**

1. **Teamreductie:**
   - Beheert de status met betrekking tot teams.
   - Verwerkt acties voor het toevoegen van teams, het bijwerken van teaminformatie en het bijwerken van teamscores.

2. **QuizzMaster-reductieprogramma:**
   - Beheert de status met betrekking tot de Quizz Master.
   - Verwerkt acties voor het weergeven van vragen, het goedkeuren/afkeuren van antwoorden en het besturen van het spel.

3. **Huidige vraagreductie:**
   - Beheert de status voor de huidige vraag.
   - Verwerkt acties voor het instellen van de huidige vraag en categorie.

4. **Antwoorden Reducer:**
   - Beheert de status voor antwoorden die door teams zijn ingediend.
   - Verwerkt acties voor het indienen van antwoorden, het bijwerken van antwoorden en het wissen van antwoorden voor de volgende vraag.

5. **Categorieën Reducer:**
   - Beheert de status voor quizcategorieën.
   - Verwerkt acties voor het laden van beschikbare categorieën en het selecteren van een categorie voor een ronde.

6. **Ronde informatieverkleiner:**
   - Beheert de status van de huidige ronde en gerelateerde gegevens.
   - Verwerkt acties om door te gaan naar de volgende ronde, volgt teams die hebben geantwoord en maakt de winnaars bekend.


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



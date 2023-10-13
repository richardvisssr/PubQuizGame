[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/nfN6GiDF)

# Webapplicatie Naam

Beschrijving van je webapplicatie en wat het doet.

## Inhoudsopgave
- [Webapplicatie Naam](#webapplicatie-naam)
  - [Inhoudsopgave](#inhoudsopgave)
  - [Ontwerp schetsen](#ontwerp-schetsen)
    - [Quizmaster View](#quizmaster-view)
    - [Quiz View](#quiz-view)
    - [Team View](#team-view)
  - [Database Schema](#database-schema)
    - [Quiz](#quiz)
    - [Questions](#questions)
    - [Round](#round)
    - [QuizMaster](#quizmaster)
    - [Team](#team)
  - [Client ontwerpen](#client-ontwerpen)
  - [Vereisten](#vereisten)
  - [Installatie](#installatie)

## Ontwerp schetsen 
In de volgende ontwerpschetsen zijn de routes bepaald en de verschillende componenten weergegeven aanhand van gekleurde blokken. 
### Quizmaster View

![Alt Text](files/QuizMaster.png?raw=true "QuizMaster")

### Quiz View

![Alt Text](files/Quiz.png?raw=true "Quiz")

### Team View

![Alt Text](files/Team.png?raw=true "Team")

## Database Schema
In de volgende sectie is het database schema weergegeven. Hierin zijn de verschillende collecties weergegeven waar wij gebruik van maken in mongodb. Zoals te zien is in het schema is er een collectie voor de quiz, de vragen, de rondes, de quizmaster en de teams, sommige collecties zijn met elkaar verbonden door middel van een UUID.
### Quiz
```json
{
  "_id": UUID,  
  "teams": [teams],
  "rounds": [round],
  "questions": [questions]
}
```

### Questions
```json
{
  "text": String,
  "answer": String,
  "category": String,
}
```

### Round
```json
{
  "text": String,
  "answer": String,
  "category": String,
}
```

### QuizMaster
```json
{
  "verificationCode": String,
}
```

### Team
```json
{
  "_id": UUID,    
  "name": String,
  "score": Number,
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

1. **Teamreducer**
   - Beheert de status met betrekking tot teams.
   - Verwerkt acties voor het toevoegen van teams, het bijwerken van teaminformatie en het bijwerken van teamscores.

2. **QuizMaster reducer**
   - Beheert de status met betrekking tot de Quizz Master.
   - Verwerkt acties voor het weergeven van vragen, het goedkeuren/afkeuren van antwoorden en het besturen van het spel.

3. **Huidige reducer**
   - Beheert de status voor de huidige vraag.
   - Verwerkt acties voor het instellen van de huidige vraag en categorie.

4. **Antwoorden reducer**
   - Beheert de status voor antwoorden die door teams zijn ingediend.
   - Verwerkt acties voor het indienen van antwoorden, het bijwerken van antwoorden en het wissen van antwoorden voor de volgende vraag.

5. **Categorieën reducer**
   - Beheert de status voor quizcategorieën.
   - Verwerkt acties voor het laden van beschikbare categorieën en het selecteren van een categorie voor een ronde.

6. **Ronde reducer:**
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
```


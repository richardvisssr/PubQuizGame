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
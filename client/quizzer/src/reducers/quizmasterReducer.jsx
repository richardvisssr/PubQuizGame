import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchQuestions = createAsyncThunk(
  "quizmaster/fetchQuestions",
  async () => {
    const response = await fetch("http://localhost:3000/questions");
    const data = await response.json();
    return data;
  }
);

const QuizmasterSlice = createSlice({
  name: "quizmaster",
  initialState: {
    showingQuestion: false,
    questions: [
      {
        "question": "Hoe wordt een middagdutje zoals dit bijvoorbeeld in Spanje wordt gehouden genoemd?",
        "answer": "Een siësta",
        "category": "Algemeen"
      },
      {
        "question": "Hoe worden rimpels bij de ooghoeken ook wel genoemd?",
        "answer": "Kraaienpootjes",
        "category": "Algemeen"
      },
      {
        "question": "Welk stripfiguur is als kind is een ketel met toverdrank gevallen?",
        "answer": "Obelix",
        "category": "Algemeen"
      },
      {
        "question": "Hoeveel zijdes heeft een dobbelsteen?",
        "answer": "6",
        "category": "Algemeen"
      },
      {
        "question": "Wat roepen Amerikaanse kinderen die langs de deuren gaan met Halloween?",
        "answer": "Trick or treat",
        "category": "Algemeen"
      },
      {
        "question": "In welke maand begint de herfst?",
        "answer": "September",
        "category": "Algemeen"
      },
      {
        "question": "Hoe wordt een wond genoemd dat is ontstaan door verbranding van de huid?",
        "answer": "Een brandwond",
        "category": "Algemeen"
      },
      {
        "question": "Waar is je hart spreekwoordelijk gemaakt als je geen gevoel hebt?",
        "answer": "Van steen",
        "category": "Algemeen"
      },
      {
        "question": "Welk attractie bedoelen de Engelsen met rollercoaster?",
        "answer": "Een achtbaan",
        "category": "feest"
      },
      {
        "question": "Hoe heet de vriend van de pop Barbie?",
        "answer": "Ken",
        "category": "kaas"
      },
      {
        "question": "Welke datum valt een schrikkeldag?",
        "answer": "29-feb",
        "category": "Algemeen"
      },
      {
        "question": "Hoe wordt de spaarkaart van supermarkt Albert Heijn genoemd?",
        "answer": "Bonuskaart",
        "category": "Algemeen"
      },
      {
        "question": "Hoe heet de pop van Wiske uit Suske en Wiske?",
        "answer": "Schanulleke",
        "category": "Algemeen"
      }
    ]
    ,
  },
  reducers: {
    showQuestion: (state, action) => {
      state.showingQuestion = true;
    },
    hideQuestion: (state, action) => {
      state.showingQuestion = false;
    },
  },
  extraReducers: {
    [fetchQuestions.fulfilled]: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const {} = QuizmasterSlice.actions;

export default QuizmasterSlice.reducer;

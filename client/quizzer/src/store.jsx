// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import quizReducer from "./reducers/quizReducer";
import teamReducer from "./reducers/teamReducer";
import answerReducer from "./reducers/answerReducer";
import quizmasterReducer from "./reducers/quizmasterReducer";
import roundReducer from "./reducers/roundReducer";

// Import redux-persist and add it to your store configuration
import { combineReducers } from 'redux';
// import { createWebStorage } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

// Combine all your reducers into a single root reducer
const rootReducer = combineReducers({
  quiz: quizReducer,
  team: teamReducer,
  answer: answerReducer,
  quizmaster: quizmasterReducer,
  round: roundReducer,
});

// Configure Redux Persist
const persistConfig = {
  key: 'root', // key is a unique identifier for your store
  storage, // the storage engine to use (localStorage by default)
  // You can customize the storage configuration further if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create your Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a Redux Persistor
export const persistor = persistStore(store);

// Export both the store and the persistor
export default store;

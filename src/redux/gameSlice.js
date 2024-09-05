import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Async thunk for fetching games from Firestore
export const fetchGames = createAsyncThunk('game/fetchGames', async () => {
  const gamesCollection = collection(db, 'games');
  const gamesSnapshot = await getDocs(gamesCollection);
  return gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Async thunk for saving a game to Firestore
export const saveGame = createAsyncThunk('game/saveGame', async (gameData) => {
  const { name, description, ...state } = gameData;
  const docRef = await addDoc(collection(db, 'games'), { name, description, state });
  return { id: docRef.id, name, description, state };
});

// Async thunk for updating a game in Firestore
export const updateGame = createAsyncThunk('game/updateGame', async ({ id, gameData }) => {
  const { name, description, ...state } = gameData;
  await updateDoc(doc(db, 'games', id), { name, description, state });
  return { id, name, description, state };
});

// Async thunk for deleting a game from Firestore
export const deleteGame = createAsyncThunk('game/deleteGame', async (id) => {
  await deleteDoc(doc(db, 'games', id));
  return id;
});

const initialState = {
  effortName: 'Effort',
  effortPoints: 100,
  pointsName: 'pts',
  impactName: 'Impact',
  impactPoints: 0,
  impactPointsName: 'Co2',
  timeName: 'Timeline',
  currentYear: 2024,
  endYear: 2050,
  rewardsCount: 0,
  rewardsTotal: 5,
  questions: [
    {
      question: "First question?",
      questionParagraph: "",
      actions: [
        { text: "Option 1", effort: 30, impact: 20 },
        { text: "Option 2", effort: 20, impact: 10 }
      ]
    }
  ],
  currentQuestionIndex: 0,
  savedGames: []
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setEffortName: (state, action) => {
      state.effortName = action.payload;
    },
    setEffortPoints: (state, action) => {
      state.effortPoints = action.payload;
    },
    setPointsName: (state, action) => {
      state.pointsName = action.payload;
    },
    setImpactName: (state, action) => {
      state.impactName = action.payload;
    },
    setImpactPoints: (state, action) => {
      state.impactPoints = action.payload;
    },
    setImpactPointsName: (state, action) => {
      state.impactPointsName = action.payload;
    },
    setTimeName: (state, action) => {
      state.timeName = action.payload;
    },
    setCurrentYear: (state, action) => {
      state.currentYear = action.payload;
    },
    setEndYear: (state, action) => {
      state.endYear = action.payload;
    },
    setRewardsCount: (state, action) => {
      state.rewardsCount = action.payload;
    },
    setRewardsTotal: (state, action) => {
      state.rewardsTotal = action.payload;
    },
    addQuestion: (state) => {
      state.questions.push({
        question: "New Question",
        actions: [
          { text: "New Action 1", effort: 0, impact: 0 },
          { text: "New Action 2", effort: 0, impact: 0 }
        ]
      });
    },
    updateQuestionActions: (state, action) => {
      const { questionIndex, actions } = action.payload;
      state.questions[questionIndex].actions = actions;
    },
    updateQuestionParagraph: (state, action) => {
      const { index, paragraph } = action.payload;
      state.questions[index].questionParagraph = paragraph;
    },
    updateQuestionTitle: (state, action) => {
      const { index, title } = action.payload;
      state.questions[index].title = title;
    },
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    loadGame: (state, action) => {
      return { ...state, ...action.payload.state, name: action.payload.name, description: action.payload.description, id: action.payload.id };
    },
    updateGameState: (state, action) => {
      const { effortPoints, impactPoints, currentYear } = action.payload;
      state.effortPoints = effortPoints;
      state.impactPoints = impactPoints;
      state.currentYear = currentYear;
    },
    deleteQuestion: (state, action) => {
      state.questions.splice(action.payload, 1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.savedGames = action.payload;
      })
      .addCase(saveGame.fulfilled, (state, action) => {
        state.savedGames.push(action.payload);
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        const index = state.savedGames.findIndex(game => game.id === action.payload.id);
        if (index !== -1) {
          state.savedGames[index] = action.payload;
        }
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.savedGames = state.savedGames.filter(game => game.id !== action.payload);
      });
  },
});

export const { 
  addQuestion, 
  setEffortName, 
  setEffortPoints, 
  setPointsName, 
  setImpactName, 
  setImpactPoints, 
  setImpactPointsName, 
  setTimeName, 
  setCurrentYear, 
  setEndYear, 
  setRewardsCount, 
  setRewardsTotal, 
  updateQuestionActions, 
  updateQuestionParagraph, 
  updateQuestionTitle, 
  setCurrentQuestionIndex, 
  loadGame, 
  updateGameState,
  deleteQuestion
} = gameSlice.actions;

export default gameSlice.reducer;
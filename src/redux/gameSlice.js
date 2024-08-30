import { createSlice } from '@reduxjs/toolkit';

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
  effortSubsections: []
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
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setActions: (state, action) => {
      state.actions = action.payload;
    },
    addAction: (state, action) => {
      state.actions.push(action.payload);
    },
    updateAction: (state, action) => {
      const { index, updatedAction } = action.payload;
      state.actions[index] = updatedAction;
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
    updateQuestion: (state, action) => {
      const { index, question } = action.payload;
      state.questions[index].question = question;
    },
    updateQuestionActions: (state, action) => {
      const { questionIndex, actions } = action.payload;
      state.questions[questionIndex].actions = actions;
    },
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    updateQuestionParagraph: (state, action) => {
      const { index, paragraph } = action.payload;
      state.questions[index].questionParagraph = paragraph;
    },
    addEffortSubsection: (state) => {
      state.effortSubsections.push({
        name: 'New Subsection',
        points: 0,
        pointsName: 'pts',
      });
    },
    updateEffortSubsection: (state, action) => {
      const { index, field, value } = action.payload;
      state.effortSubsections[index][field] = value;
    },
    removeEffortSubsection: (state, action) => {
      state.effortSubsections.splice(action.payload, 1);
    },
  },
});

export const { 
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
  setDifficulty, 
  setQuestion, 
  setActions, 
  addAction, 
  updateAction, 
  addQuestion, 
  updateQuestion, 
  updateQuestionActions, 
  setCurrentQuestionIndex, 
  updateQuestionParagraph,
  addEffortSubsection,
  updateEffortSubsection,
  removeEffortSubsection
} = gameSlice.actions;

export default gameSlice.reducer;

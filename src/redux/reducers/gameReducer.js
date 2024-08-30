// src/redux/reducers/gameReducer.js
const initialState = {
    effortPoints: 100,
    actionsTaken: [],
    currentRound: 1,
  };
  
  const gameReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TAKE_ACTION':
        return {
          ...state,
          effortPoints: state.effortPoints - action.payload.cost,
          actionsTaken: [...state.actionsTaken, action.payload.action],
        };
      case 'NEXT_ROUND':
        return {
          ...state,
          currentRound: state.currentRound + 1,
        };
      // Add more cases as needed
      default:
        return state;
    }
  };
  
  export default gameReducer;
  
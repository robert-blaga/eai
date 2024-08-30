// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import gameReducer from './gameReducer'; // Import your specific reducer

export default combineReducers({
  game: gameReducer,
  // Add other reducers as needed
});

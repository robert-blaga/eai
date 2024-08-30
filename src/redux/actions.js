// src/redux/actions.js
export const takeAction = (action, cost) => ({
    type: 'TAKE_ACTION',
    payload: { action, cost },
  });
  
  export const nextRound = () => ({
    type: 'NEXT_ROUND',
  });
  
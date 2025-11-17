import { useReducer } from "react"

const useGameState = () => {
  const initialState = {
    player: {
      x: 80,
      y: 200,
      velocityX: 2,
      velocityY: 0,
      lives: 3
    },
    score: 0
  };

  function gameReducer(state, action) {
    switch (action.type) {
      case 'ADD_SCORE':
        return {
          ...state,
          score: state.score + action.payload
        };

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(gameReducer, initialState)
  console.log("state", state)
  console.log("dispath", dispatch)

  return { state, dispatch }
}

export default useGameState
import { useReducer, useEffect } from "react"

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
        }
      case 'UPDATE_PLAYER_POSITION':
        return {
          ...state,
          player: {
            ...state.player,
            x: state.player.x + action.payload.deltaX,
            y: state.player.y + action.payload.deltaY
          }
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({
        type: 'UPDATE_PLAYER_POSITION',
        payload: {
          deltaX: 2,
          deltaY: 0
        }
      })
    }, 16)

    return () => {
      clearInterval(intervalId);
    }
  }, [])

  console.log("state", state)
  console.log("dispath", dispatch)

  return { state, dispatch }
}

export default useGameState
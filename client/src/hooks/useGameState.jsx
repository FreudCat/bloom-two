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
      case 'SET_PLAYER_VELOCITY_X':
        return {
          ...state,
          player: {
            ...state.player,
            velocityX: action.payload.velocityX
          }
        }
      case 'SET_PLAYER_VELOCITY_Y':
        return {
          ...state,
          player: {
            ...state.player,
            velocityY: action.payload.velocityY
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
          deltaX: state.player.velocityX,
          deltaY: state.player.velocityY
        }
      })
    }, 16)

    return () => {
      clearInterval(intervalId);
    }
  }, [state.player.velocityX, state.player.velocityY])


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_X',
          payload: { velocityX: 5 }
        });
      }

      if (event.key === 'ArrowLeft') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_X',
          payload: { velocityX: 1 }
        });
      }

      if (event.key === 'ArrowUp') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_Y',
          payload: { velocityY: -2 }
        });
      }

      if (event.key === 'ArrowDown') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_Y',
          payload: { velocityY: 2 }
        });
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowRight') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_X',
          payload: { velocityX: 2 }
        })
      }

      if (event.key === 'ArrowLeft') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_X',
          payload: { velocityX: 2 }
        })
      }

      if (event.key === 'ArrowUp') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_Y',
          payload: { velocityY: 0 }
        });
      }

      if (event.key === 'ArrowDown') {
        dispatch({
          type: 'SET_PLAYER_VELOCITY_Y',
          payload: { velocityY: 0 }
        });
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return { state, dispatch }
}

export default useGameState
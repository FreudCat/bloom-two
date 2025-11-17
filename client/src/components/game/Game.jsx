import Player from "./Player"
import useGameState from "../../hooks/useGameState"

const Game = () => {
  const { state, dispatch } = useGameState()

  const gridRows = 10
  const gridColumns = 10
  const gridHeightWidthBasePx = 40
  const playerInvicibilityDuration = 2000 // in ms
  const playerSpeedBase = gridHeightWidthBasePx
  const playerSpeedFast = playerSpeedBase * 1.5
  const playerSpeedSlow = playerSpeedBase * 0.5

  const dotHeightWidthBase = 10
  const dotPointsValueBase = 10
  const dotMaxNumOnScreenBase = 1

  const fireMaxNumOnScreenBase = 5
  const scoreWinner = 500

  const addPoints = () => {
    // each useReducer has a specific dispatch
    dispatch({ type: 'ADD_SCORE', payload: 10 });
  };

  return (
    <div className='game-wrapper'>
      <div className='game-stage'>
        <Player />
      </div>

      <div>
        <p>Score: {state.score}</p>
        <p>Lives: {state.player.lives}</p>
        <p>Player X: {state.player.x}</p>
        <p>Player Y: {state.player.y}</p>
      </div>

      {/* Test button */}
      <button onClick={addPoints}>
        Add 10 Points
      </button>
    </div>
  )

}

export default Game
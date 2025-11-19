import Player from "./Player"
import Fire from "./Fire"
import Coin from "./Coin"
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
    dispatch({
      type: 'ADD_SCORE',
      payload: 10
    })
  }

  return (
    <div className='game-wrapper'>
      <div className='game-stage' style={{
        position: 'relative',
        width: '800px',
        height: '400px',
        overflow: 'hidden',
        border: '2px solid #333'
      }}>
        <Player
          x={state.player.x}
          y={state.player.y}
        />

        {state.fires && state.fires.map(fire => (
          <Fire
            key={fire.id}
            x={fire.x}
            y={fire.y}
          />
        ))}

        {state.coins && state.coins.map(coin => (
          <Coin
            key={coin.id}
            x={coin.x}
            y={coin.y}
          />
        ))}
      </div>

      <div>
        <p>Score: {state.score}</p>
        <p>Lives: {state.player.lives}</p>
        <p>Player X: {state.player.x}</p>
        <p>Player Y: {state.player.y}</p>
        <p>Game Speed: {state.gameSpeed}</p>
        <p>fires: {state.fires ? state.fires.length : 0}</p>
      </div>

      {/* Test button */}
      <button onClick={addPoints}>
        Add 10 Points
      </button>
    </div>
  )

}

export default Game
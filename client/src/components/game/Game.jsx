import Player from './Player'
import Fire from './Fire'
import Coin from './Coin'
import useGameState from '../../hooks/useGameState'
import GameOver from './GameOver'

const Game = () => {
  const { state, dispatch } = useGameState()

  const handleReplay = () => {
    dispatch({ type: 'RESTART_GAME' })
  }

  if (state.isGameOver) {
    return (
      <div className='game-wrapper'>
        <GameOver
          score={state.score}
          timePlayed={state.timePlayed}
          replayGame={handleReplay}
        />
      </div>
    )
  }

  return (
    <div className='game-wrapper'>
      <div className='how-to-win'>
        <h2>Accumulate 100 points to win</h2>
      </div>
      <div className='game-status'>
        <p><span>Score:</span> {state.score}</p>
        <p><span>Lives:</span> {state.player.lives}</p>
      </div>
      <div className='game-stage'>
        <Player
          x={state.player.x}
          y={state.player.y}
          isInvincible={state.player.isInvincible}
          isHit={state.player.isHit}
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
    </div>
  )

}

export default Game
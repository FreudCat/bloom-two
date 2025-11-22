const GameOver = (props) => {
  const seconds = Math.floor(props.timePlayed / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const timeDisplay = minutes > 0
    ? `${minutes}m ${remainingSeconds}s`
    : `${seconds}s`

  return (
    <div className='game-over-wrapper'>
      <div className='game-over-content'>
        <h2>Game Over!</h2>
        <div className='game-over-stats-wrapper'>
          <div className='stat'>
            <span className='stat-label'> Final Score:</span >
            <span className='stat-value'> {props.score}</span >
          </div >
          <div className='stat'>
            <span className='stat-label'> Time Played:</span >
            <span className='stat-value'> {timeDisplay}</span >
          </div >
        </div >
        <button className='button-replay' onClick={props.replayGame} >
          Play Again
        </button >
      </div >
    </div >
  )
}

export default GameOver
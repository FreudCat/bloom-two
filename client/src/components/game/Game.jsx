const Game = () => {

  // grid 
  const gridRows = 10
  const gridColumns = 10
  const gridHeightWidthBasePx = 40
  // player 
  const playerLives = 2
  const playerInvicibilityDuration = 2000 // in ms
  const playerSpeedBase = gridHeightWidthBasePx
  const playerSpeedFast = playerSpeedBase * 1.5
  const playerSpeedSlow = playerSpeedBase * 0.5

  // dot 
  const dotHeightWidthBase = 10
  const dotPointsValueBase = 10
  const dotMaxNumOnScreenBase = 1

  // fires
  const fireMaxNumOnScreenBase = 5


  const scoreWinner = 500

  return (
    <div className='game-wrapper'>
      <div className='game-stage'>

      </div>
    </div>
  )

}

export default Game
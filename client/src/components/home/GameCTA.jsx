import { Link } from "@tanstack/react-router"

const GameCTA = () => {
  return (
    <div className='game-cta'>
      <h3>Play My Game!</h3>
      <p>
        A basic game built in React, which allowed me to play around with different hooks.
      </p>
      <Link to='/game'>
        <button className='game-cta-button'>Play Game</button>
      </Link>
    </div>
  )
}

export default GameCTA
const Player = (props) => {
  const isInvincible = props.isInvincible


  return (
    <div className='player-wrapper'>
      <svg width='20' height='20' viewBox='0 0 20 20' className='player'>
        <polygon
          points='0,0 20,10 0,20'
          fill='#00ff00'
          stroke='#00aa00'
          strokeWidth='1'
        />
      </svg>
    </div>
  )
}

export default Player
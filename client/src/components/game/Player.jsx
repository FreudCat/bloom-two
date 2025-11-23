const Player = (props) => {
  const isInvincible = props.isInvincible

  return (
    <div
      className='player-wrapper'
      style={{
        left: `${props.x}px`,
        top: `${props.y}px`
      }}
    >
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        className={`player ${props.isHit ? 'hit' : ''} ${props.isInvincible ? 'invincible' : ''}`}
      >
        <polygon points='0,0 20,10 0,20' />
      </svg>
    </div>
  )
}

export default Player
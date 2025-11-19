const Coin = (props) => {
  return (
    <div
      className='coin'
      style={{
        left: `${props.x}px`,
        top: `${props.y}px`
      }}
    >
      🪙
    </div>
  )
}

export default Coin
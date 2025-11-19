const Fire = (props) => {
  return (
    <div
      className="fire"
      style={{
        left: `${props.x}px`,
        top: `${props.y}px`
      }}
    >
      🔥
    </div>
  )
}

export default Fire

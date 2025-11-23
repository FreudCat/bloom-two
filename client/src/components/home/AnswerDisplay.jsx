
const AnswerDisplay = (props) => {
  return (
    <div
      className={'answer-wrapper'} >
      <p className={`${props.isCorrect ? 'correct' : 'incorrect'} answer`}>{props.message}</p>
    </div >
  )
}

export default AnswerDisplay
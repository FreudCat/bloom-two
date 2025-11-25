import { useState } from 'react'
import AnswerDisplay from './AnswerDisplay'

const TwoTruths = () => {
  const [selected, setSelected] = useState('')

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const answerMap = {
    val1: {
      message: 'You are correct! I actually am a licensed veterinarian who taught and practiced at Washington State University for a few years before deciding on a career change. ',
      isCorrect: true
    },
    val2: {
      message: 'You are half correct! I was voted "most helpful" in 2024, but in 2025 I was voted "most zen" team member for calm problem-solving during stressful situations.',
      isCorrect: true
    },
    val3: {
      message: 'Not yet, but maybe one day!',
      isCorrect: false
    }
  }

  return (
    <section id='section-two-truths' className='two-truths'>
      <div className='selection-wrapper'>
        <h2>Find the Truth!</h2>
        <p>Guess the true statement</p>
        <fieldset className='selections'>
          <label className="selection">
            <input
              type="radio"
              name="ttal"
              value="val1"
              checked={selected === "val1"}
              onChange={handleChange}
              aria-label="I am a licensed veterinarian" />
            Before entering the tech field, I practiced veterinary medicine. I am still licensed!
          </label>

          <label className="selection">
            <input
              type="radio"
              name="ttal"
              value="val2"
              checked={selected === "val2"}
              onChange={handleChange}
              aria-label="I was voted “most helpful” team member for consistently cosistent problem-solving, mentorship, and documentation." />
            In 2024 and 2025, I was voted “most helpful” team member for consistently cosistent problem-solving, mentorship, and documentation.
          </label>

          <label className="selection">
            <input
              type="radio"
              name="ttal"
              value="val3"
              checked={selected === "val3"}
              onChange={handleChange}
              aria-label="I created a machine-learning model that predicts production bugs before they happen." />
            I created a machine-learning model that predicts production bugs before they happen.
          </label>
        </fieldset>
      </div>
      {selected
        && <AnswerDisplay
          message={answerMap[selected].message}
          isCorrect={answerMap[selected].isCorrect}
        />
      }
    </section>
  )
}

export default TwoTruths
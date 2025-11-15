import { useState } from 'react'
import AnswerDisplay from './AnswerDisplay'

const TwoTruths = () => {
  const [selected, setSelected] = useState('')

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const answerMap = {
    val1: {
      message: 'Ooh, try again! I actually am a licensed veterinarian who taught and practiced at Washington State University for a few years before decided on a career change.',
      isCorrect: false
    },
    val2: {
      message: 'You are correct! I actually have a worm farm, not an ant farm. The worm farm composts food scraps and makes vermicompost that can be used in the garden. Now I just need a garden! :)',
      isCorrect: true
    },
    val3: {
      message: 'Not quite! I did actually get to participate in a city-wide game of tag in Chicago. I got to the second "safe" station before I was tagged out.',
      isCorrect: false
    }
  }

  return (
    <section id='section-two-truths' className='two-truths'>
      <div className='selection-wrapper'>
        <h2>Two Truths</h2>
        <p>Pick the lie below</p>
        <fieldset className='selections'>
          <label className="selection">
            <input
              type="radio"
              name="ttal"
              value="val1"
              checked={selected === "val1"}
              onChange={handleChange}
              aria-label="I am a licensed veterinarian" />
            I am a licensed veterinarian
          </label>

          <label className="selection">
            <input
              type="radio"
              name="ttal"
              value="val2"
              checked={selected === "val2"}
              onChange={handleChange}
              aria-label="I own an ant farm" />
            I own an ant farm
          </label>

          <label className="selection">
            <input
              type="radio"
              name="ttal"
              value="val3"
              checked={selected === "val3"}
              onChange={handleChange}
              aria-label="I once participated in a city-wide game of tag in Chicago" />
            I once participated in a city-wide game of tag in Chicago
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
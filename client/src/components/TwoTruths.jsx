import { useState } from 'react'
import AnswerDisplay from './AnswerDisplay'

const TwoTruths = () => {
  const [selected, setSelected] = useState('')

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  return (
    <section>
      <div className='selection-wrapper'>
        <h2>Two Truths</h2>
        <p>Pick the lie below</p>
        <fieldset class='selections'>
          <label className="selection">
            <input type="radio" name="ttal" value="val1"
              checked={selected === "val1"}
              onChange={handleChange} />
            I am a license veterinarian
          </label>

          <label className="selection">
            <input type="radio" name="ttal" value="val2"
              checked={selected === "val2"}
              onChange={handleChange} />
            I own an ant farm
          </label>

          <label className="selection">
            <input type="radio" name="ttal" value="val3"
              checked={selected === "val3"}
              onChange={handleChange} />
            I once participated in a city-wide game of tag in Chicago
          </label>
        </fieldset>
      </div>
      <AnswerDisplay selected={selected} />

    </section>
  )
}

export default TwoTruths
import React, { useState } from 'react'

const History = ({ good, neutral, bad, all, average, positive }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
      </div>
    )
  }
}

const StatisticLine = ({ text, value }) => (
  <div>
    <table style={{ borderCollapse: 'collapse'}}>
      <tbody>
        <tr>
          <td style={{ width: '60px'}}>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  </div>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={`${positive} %`} />
    </div>
  )
}

const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>

const Header = ({ header1, header2 }) => (
    <div>
      <h1>{header1}</h1>        
      <h1>{header2}</h1>      
    </div>
  )

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const names = {
    header1: 'Give feedback',
    header2: 'Statistics'
  }

  const increaseGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    updateStatistics(updatedGood, neutral, bad)
  }

  const increaseNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    updateStatistics(good, updatedNeutral, bad)
  }

  const increaseBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    updateStatistics(good, neutral, updatedBad)
  }

  const updateStatistics = (updatedGood, updatedNeutral, updatedBad) => {
    const updatedAll = updatedGood + updatedNeutral + updatedBad
    setAll(updatedAll)
    setAverage((updatedGood - updatedBad) / updatedAll)
    setPositive((updatedGood / updatedAll) * 100)
  }

  return (
    <div>
      <Header header1={names.header1} />
      <Button onSmash={increaseGood} text="Good" />
      <Button onSmash={increaseNeutral} text="Neutral" />
      <Button onSmash={increaseBad} text="Bad" />
      <Header header2={names.header2} />
      <History good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App

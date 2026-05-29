import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

function Button({onClick, text}) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

function Statistics({good, neutral, bad}) {
  const all = good + neutral + bad;
  if (all === 0) {
    return (
      <p>No feedback yet</p>
    )
  }

  const average = all ? (good - bad) / all : 0;
  const positive = all ? 100 / all * good : 0;

  return (
    <div>
      <h2>Statistics:</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" postText="%" value={positive} />
        </tbody>
      </table>
    </div>
  );
}

function StatisticLine({text, postText, value}) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{postText}</td>
    </tr>
  );
}

export default App;
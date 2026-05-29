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
  const average = all ? (good - bad) / all : 0;
  const positive = all ? 100 / all * good : 0;

  return (
    <div>
      <h2>Statistics:</h2>
      <Record text="good" value={good} />
      <Record text="neutral" value={neutral} />
      <Record text="bad" value={bad} />
      <Record text="all" value={all} />
      <Record text="average" value={average} />
      <Record text="positive" postText="%" value={positive} />
    </div>
  );
}

function Record({text, postText, value}) {
  return (
    <p>{text}: {value}{postText}</p>
  );
}

export default App;
import { useFeedbackValues } from '../stores/FeedbackStore';
import StatisticLine from './StatisticLine';

export default function Statistics() {
  const { good, neutral, bad } = useFeedbackValues();

  const all = good + neutral + bad;
  if (all === 0) {
    return (
      <p>No feedback yet</p>
    );
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

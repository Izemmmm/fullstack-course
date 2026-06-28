import { useFeedbackControls } from '../stores/FeedbackStore';

export default function FeedbackPanel() {
  const { incrementGood, incrementBad, incrementNeutral } = useFeedbackControls();

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  );
}

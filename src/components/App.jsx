import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';
import { useState } from 'react';

export default function App() {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const countTotalFeedback = Object.values(state).reduce(
    (acc, el) => (acc += el)
  );

  const countPositiveFeedback = Math.round(
    (state.good / countTotalFeedback) * 100
  );

  function handleAddFeedback(feedback) {
    setState(prevState => ({
      ...prevState,
      [feedback]: prevState[feedback] + 1,
    }));
  }

  return (
    <Section title="Please live feedback">
      <FeedbackOptions
        options={Object.keys(state)}
        onLeaveFeedback={handleAddFeedback}
      />
      {countTotalFeedback ? (
        <Statistics
          good={state.good}
          neutral={state.neutral}
          bad={state.bad}
          total={countTotalFeedback}
          positivePercentage={countPositiveFeedback}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Section>
  );
}

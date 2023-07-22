import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

import { useState } from 'react';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = type => {
    if (type === 'good') setGood(good + 1);
    if (type === 'neutral') setNeutral(neutral + 1);
    if (type === 'bad') setBad(bad + 1);
  };

  const countTotalFeedback = options => {
    return options.reduce((previousValue, number) => previousValue + number, 0);
  };

  const countPositiveFeedbackPercentage = (good, total) => {
    return Math.round((good / total) * 100);
  };

  const total = countTotalFeedback([good, neutral, bad]);
  const positivePercentage = countPositiveFeedbackPercentage(good, total);

  return (
    <>
      <Section title="Please leave feedback">
        Please leave feedbacks
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        Statistics
        {countTotalFeedback([good, neutral, bad]) > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </>
  );
};

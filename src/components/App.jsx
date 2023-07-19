import { Component } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = type => {
    this.setState(prev => ({ [type]: prev[type] + 1 }));
  };

  countTotalFeedback = options => {
    return options.reduce((previousValue, number) => previousValue + number, 0);
  };

  countPositiveFeedbackPercentage = (good, total) => {
    return Math.round((good / total) * 100);
  };

  render() {
    const total = this.countTotalFeedback(Object.values(this.state));
    const positivePercentage = this.countPositiveFeedbackPercentage(
      this.state.good,
      total
    );

    return (
      <>
        <Section title="Please leave feedback">
          Please leave feedbacks
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.onLeaveFeedback}
          ></FeedbackOptions>
        </Section>
        <Section title="Statistics">
          Statistics
          {this.countTotalFeedback(Object.values(this.state)) > 0 ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={total}
              positivePercentage={positivePercentage}
            ></Statistics>
          ) : (
            <Notification message="There is no feedback"></Notification>
          )}
        </Section>
      </>
    );
  }
}

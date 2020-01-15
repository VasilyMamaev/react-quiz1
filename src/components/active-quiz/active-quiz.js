import React from 'react';
import classes from './active-quiz.module.css';
import AnswersList from './answers-list/answers-list';

const ActiveQuiz = (props) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.answeNumber}.</strong>
        &nbsp;{/*символ пробела */}
        {props.question}
      </span>

      <small>{props.answeNumber} из {props.quizLength}</small>
    </p>

    <AnswersList
      answers={props.answers}
      answerClickHandler={props.answerClickHandler}
      state={props.state}
    />

  </div>
)

export default ActiveQuiz
import React from 'react';
import classes from './answers-list.module.css';
import AnswerItem from './answer-item/answer-item';

const AnswersList= (props) => (
  <ul className={classes.AnswersList}>
    { props.answers.map((it,i) => {
      return (
        <AnswerItem
          key={i}
          answer={it}
          answerClickHandler={props.answerClickHandler}
          state={props.state ? props.state[it.id] : null}
        />
      )
    })}    
  </ul>
  
)

export default AnswersList
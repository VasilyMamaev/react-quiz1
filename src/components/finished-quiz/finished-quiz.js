import React from 'react';
import classes from './finished-quiz.module.css';
import Button from '../ui/button/button';

const FinishedQuiz = (props) => {

  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }

    return total
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        { props.quiz.map((it, i) => {
          const cls = [
            'fa',
            props.results[it.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[it.id]]
          ]

          return(
            <li key={i}>
              <strong>{i + 1}</strong>.&nbsp;{/*символ пробела */}
              {it.question}
              <i className={cls.join(' ')} />
            </li>
          )
        }) }
      </ul>

      <p>Правильно {successCount} из {props.quiz.length}</p>

      <div>
        <Button onClick={props.retryHandler} type="primary">Повторить</Button>
        <Button type="success">Перейти в список тестов</Button>
      </div>
    </div>
  )
}

export default FinishedQuiz;
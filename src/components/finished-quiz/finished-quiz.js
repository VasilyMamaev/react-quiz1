import React from 'react';
import classes from './finished-quiz.module.css';
import Button from '../ui/button/button';
import {Link} from 'react-router-dom'

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
        <Button onClick={props.onRetry} type="primary">Повторить</Button>
        <Link to="/">
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz;
import React, { Component } from 'react';
import classes from './quiz.module.css';
import ActiveQuiz from '../../components/active-quiz/active-quiz';
import FinishedQuiz from '../../components/finished-quiz/finished-quiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/ui/loader/loader';

class Quiz extends Component{
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true
  }

  answerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results: results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuisFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
      
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results: results
      })
    }
  }

  isQuisFinished () {
    return (this.state.activeQuestion + 1) === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
      const quiz = response.data

      this.setState({
        quiz,
        loading: false
      })
    } catch(e) {
      console.log(e)
    }
    console.log('Quiz ID = ')
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>

        {
          this.state.loading
            ? <Loader />
            : this.state.isFinished
              ? <FinishedQuiz 
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
                />
              : <ActiveQuiz 
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                answerClickHandler={this.answerClickHandler}
                quizLength={this.state.quiz.length}
                answeNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
                />
        }

        </div>
      </div>
    )
  }
}

export default Quiz
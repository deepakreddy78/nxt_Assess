import React, {Component} from 'react'

const OptionData = React.createContext({
  time: '00:10:00',
  clearTime: () => {},
  score: 0,

  totalQuestions: 10,
  startTheNoOfQuestion: 0,
  answered: 0,
  unanswered: 10,
  questions: [],
  answers: {},
  updateQuestions: () => {},
  updateStartQuestion: () => {},
  submitAnswer: () => {},
  getCurrentAnswer: () => {},
})

class OptionProvider extends Component {
  state = {
    time: '00:10:00',
    score: 0,
    capturedTime: null,
    totalQuestions: 10,
    startTheNoOfQuestion: 0,
    answered: 0,
    unanswered: 10,
    questions: [],
    answers: {},
  }

  captureSubmitTime = () => {
    this.setState(prevState => {
      console.log('Captured Time:', prevState.time)
      return {capturedTime: prevState.time}
    })
  }

  updateQuestions = newQuestions => {
    this.setState({
      questions: newQuestions,
      totalQuestions: newQuestions.length,
      unanswered: newQuestions.length,
    })
  }

  updateStartQuestion = newIndex => {
    this.setState({startTheNoOfQuestion: newIndex})
  }

  submitAnswer = (questionId, selectedOptionId, isCorrect) => {
    this.setState(prevState => {
      const {answers, answered, unanswered, score} = prevState
      const wasAlreadyAnswered = Object.prototype.hasOwnProperty.call(
        answers,
        questionId,
      )

      return {
        answers: {
          ...answers,
          [questionId]: selectedOptionId,
        },
        answered: wasAlreadyAnswered ? answered : answered + 1,
        unanswered: wasAlreadyAnswered ? unanswered : unanswered - 1,
        score: isCorrect ? score + 1 : score,
      }
    })
  }

  getCurrentAnswer = questionId => {
    const {answers} = this.state
    return answers[questionId] || null
  }

  clearTime = () => {
    this.setState({time: '00:00:00'})
  }

  render() {
    const {children} = this.props
    const {
      time,
      score,
      capturedTime,
      totalQuestions,
      answered,
      unanswered,
      questions,
      startTheNoOfQuestion,
      answers,
    } = this.state

    return (
      <OptionData.Provider
        value={{
          time,
          score,
          capturedTime,
          totalQuestions,
          answered,
          unanswered,
          questions,
          startTheNoOfQuestion,
          answers,
          captureSubmitTime: this.captureSubmitTime,
          updateQuestions: this.updateQuestions,
          updateStartQuestion: this.updateStartQuestion,
          submitAnswer: this.submitAnswer,
          getCurrentAnswer: this.getCurrentAnswer,
          clearTime: this.clearTime,
        }}
      >
        {children}
      </OptionData.Provider>
    )
  }
}

export {OptionProvider}
export default OptionData

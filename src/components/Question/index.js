import {Component} from 'react'
import OptionData from '../../Context/OptionData'
import './index.css'

class Questions extends Component {
  handleNextQuestion = () => {
    const {startTheNoOfQuestion, updateStartQuestion, questions} = this.context

    if (startTheNoOfQuestion < questions.length - 1) {
      updateStartQuestion(startTheNoOfQuestion + 1)
    }
  }

  renderDefaultOptions = (options, questionId) => {
    const {submitAnswer, getCurrentAnswer} = this.context
    const currentAnswer = getCurrentAnswer(questionId)

    return (
      <ul className="options-list default-options">
        {options.map(option => (
          <li
            key={option.id}
            className={`option-item ${
              currentAnswer === option.id ? 'selected' : ''
            }`}
            onClick={() =>
              submitAnswer(questionId, option.id, option.isCorrect)
            }
            onKeyDown={e =>
              e.key === 'Enter' &&
              submitAnswer(questionId, option.id, option.isCorrect)
            }
          >
            {option.text}
          </li>
        ))}
      </ul>
    )
  }

  renderImageOptions = (options, questionId) => {
    const {submitAnswer, getCurrentAnswer} = this.context
    const currentAnswer = getCurrentAnswer(questionId)

    return (
      <div className="options-grid image-options">
        {options.map(option => (
          <div
            key={option.id}
            className={`image-option ${
              currentAnswer === option.id ? 'selected' : ''
            }`}
            onClick={() =>
              submitAnswer(questionId, option.id, option.isCorrect)
            }
            role="button"
            tabIndex={0}
            onKeyDown={e =>
              e.key === 'Enter' &&
              submitAnswer(questionId, option.id, option.isCorrect)
            }
          >
            <img
              src={option.imageUrl}
              alt={option.text}
              className="option-image"
            />
          </div>
        ))}
      </div>
    )
  }

  renderSingleSelectOptions = (options, questionId) => {
    const {submitAnswer, getCurrentAnswer} = this.context
    let currentAnswer = getCurrentAnswer(questionId)

    // If no answer is selected, set the first option as default
    if (!currentAnswer && options.length > 0) {
      currentAnswer = options[0].id
      submitAnswer(questionId, options[0].id, options[0].isCorrect)
    }

    return (
      <div className="dropdown-container">
        <select
          className="dropdown-select"
          value={currentAnswer}
          onChange={event => {
            const selectedOption = options.find(
              option => option.id === event.target.value,
            )
            submitAnswer(
              questionId,
              selectedOption.id,
              selectedOption.isCorrect,
            )
          }}
        >
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    )
  }

  renderOptions = question => {
    switch (question.optionsType) {
      case 'IMAGE':
        return this.renderImageOptions(question.options, question.id)
      case 'SINGLE_SELECT':
        return this.renderSingleSelectOptions(question.options, question.id)
      case 'DEFAULT':
      default:
        return this.renderDefaultOptions(question.options, question.id)
    }
  }

  render() {
    const {questions, startTheNoOfQuestion} = this.context

    if (!questions || questions.length === 0) {
      return <div className="loading">Loading questions...</div>
    }

    const currentQuestion = questions[startTheNoOfQuestion]

    if (!currentQuestion) {
      return (
        <div className="completion">
          <h2>Assessment Complete!</h2>
          <p>You answered all questions</p>
        </div>
      )
    }

    return (
      <div className="question-container">
        <h2 className="question-text">
          {startTheNoOfQuestion + 1}.{currentQuestion.questionText}
        </h2>

        {this.renderOptions(currentQuestion)}

        {/* NEXT BUTTON */}
        <div className="next-button-container">
          <button
            type="button"
            onClick={this.handleNextQuestion}
            disabled={startTheNoOfQuestion >= questions.length - 1}
            className="next-button"
          >
            Next Question
          </button>
        </div>
      </div>
    )
  }
}

//  Move contextType outside the class to fix ESLint issue
Questions.contextType = OptionData

export default Questions

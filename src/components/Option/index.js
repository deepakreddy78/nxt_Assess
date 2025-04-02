import {Component} from 'react'
import {Link} from 'react-router-dom/cjs/react-router-dom'
import OptionData from '../../Context/OptionData'
import './index.css'

class Option extends Component {
  render() {
    return (
      <OptionData.Consumer>
        {({
          questions = [],
          answers = {},
          captureSubmitTime,
          startTheNoOfQuestion,
          updateStartQuestion = () => {},
        }) => (
          <div className="option-container">
            <div className="number-of-question">
              <div className="answer-question-container">
                <span className="span-answer-question">
                  {Object.keys(answers).length}
                </span>
                <p className="answered-text">Answered Questions</p>
              </div>
              <div className="unanswer-question">
                <span className="span-unanswer-question">
                  {questions.length - Object.keys(answers).length}
                </span>
                <p className="unanswered-text">Unanswered Questions</p>
              </div>
            </div>
            <hr />

            <div className="Submit-container">
              <div>
                <h4 className="total-question">
                  Questions ({questions.length})
                </h4>
                <div className="no-of-questions-answered">
                  {questions.map((question, index) => {
                    const isAnswered = question.id in answers
                    const isCurrent = index === startTheNoOfQuestion
                    return (
                      <button
                        type="button"
                        key={question.id}
                        className={`question-btn ${
                          isAnswered ? 'answered' : 'unanswered'
                        } ${isCurrent ? 'current-question' : ''}`}
                        onClick={() => updateStartQuestion(index)}
                      >
                        {index + 1}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="sub-btn">
                <Link to="/submit">
                  <button
                    type="button"
                    className="submit-Assessment-button"
                    onClick={captureSubmitTime}
                  >
                    Submit Assessment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </OptionData.Consumer>
    )
  }
}

export default Option

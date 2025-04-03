import {Component} from 'react'
import {Link} from 'react-router-dom/cjs/react-router-dom.min'
import OptionData from '../../Context/OptionData'
import completed from '../imgs/completed.svg'
import './index.css'

class Submit extends Component {
  render() {
    return (
      <OptionData.Consumer>
        {({capturedTime, score, resetAssessment}) => (
          <div className="submit-container">
            <img src={completed} className="sub-img" alt="submit" />
            <h1 className="sub-heading">
              Congrats! You completed the assessment.
            </h1>
            <p className="sub-timeing">Time Taken: {capturedTime}</p>
            <h3 className="sub-score">Your Score: {score}</h3>
            <Link to="/assessment">
              <button
                type="button"
                onClick={resetAssessment}
                className="sub-reattempt-button"
              >
                Reattempt
              </button>
            </Link>
          </div>
        )}
      </OptionData.Consumer>
    )
  }
}

export default Submit

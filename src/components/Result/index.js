import {Component} from 'react'
import {Link} from 'react-router-dom/cjs/react-router-dom.min'
import OptionData from '../../Context/OptionData'
import timeUp from '../imgs/timeUp.svg'
import './index.css'

class Result extends Component {
  render() {
    return (
      <OptionData.Consumer>
        {({score, resetAssessment}) => (
          <div className="result-container">
            <img src={timeUp} className="sub-img" alt="submit" />
            <h1 className="res-heading">Time is up</h1>
            <p className="res-timeing">
              You did not complete the assessment within the time.
            </p>
            <h3 className="res-score">Your Score: {score}</h3>
            <Link to="/assessment">
              <button
                type="button"
                onClick={resetAssessment}
                className="res-reattempt-button"
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

export default Result

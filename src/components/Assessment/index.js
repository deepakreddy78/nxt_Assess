import {Component} from 'react'
import QuestionTimer from '../QuestionTimer'
import NavBar from '../NavBar'
import Timer from '../Timer'
import Option from '../Option'
import './index.css' // Make sure to create this CSS file

class Assessment extends Component {
  render() {
    return (
      <div className="assessment-container">
        <NavBar />
        <div className="assessment-layout">
          {/* Left side - Questions */}
          <div className="questions-section">
            <QuestionTimer />
          </div>

          {/* Right side - Timer and Options */}
          <div className="timer-section">
            <Timer />
            <Option />
          </div>
        </div>
      </div>
    )
  }
}

export default Assessment

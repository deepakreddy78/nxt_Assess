import {Component} from 'react'
import NavBar from '../Navbar'

import Instructions from '../imgs/Instructions.svg'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="home-ele">
          <div className="home-card-details">
            <h1 className="home-heading"> Instructions </h1>
            <p className="home-para">
              <span className="instructions-num">1.</span> Total Questions: 10
            </p>
            <p className="home-para">
              <span className="instructions-num">2.</span> Types of Questions:
              MCQs
            </p>
            <p className="home-para">
              <span className="instructions-num">3.</span> Duration: 10 Mins
            </p>
            <p className="home-para">
              <span className="instructions-num">4.</span> Marking Scheme: Every
              Correct response, get 1 mark
            </p>
            <p className="home-para">
              <span className="instructions-num">5.</span> All the progress will
              be lost, if you reload during the assessment
            </p>
            <button className="start-button" type="button">
              Start Assessment
            </button>
          </div>
          <div className="instructions-container">
            <img
              className="instructions-img"
              src={Instructions}
              alt="instructions"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Home

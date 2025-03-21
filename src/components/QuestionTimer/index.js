import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import someThingWentWrong from '../imgs/sww.svg'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class QuestionTimer extends Component {
  state = {
    //  optionData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOptionData()
  }

  onClickRetryButton = () => {
    this.getOptionData()
  }

  getOptionData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/assess/questions'
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const fetchData = await response.json()
      console.log(fetchData)
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src={someThingWentWrong}
        alt="failure view"
        className="some-thing wnent wrong"
      />
      <div>
        <h1 className="sww-heading">Oops! Something went wrong</h1>
        <p className="sww-para">We are having some trouble</p>
        <button
          className="sww-btn"
          type="button"
          onClick={this.onClickRetryButton}
        >
          Retry
        </button>
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <>
        {() => {
          switch (apiStatus) {
            case apiStatusConstants.inProgress:
              return this.renderLoadingView()
            case apiStatusConstants.failure:
              return this.renderFailureView()
            case apiStatusConstants.success:
              return <div>Success! Render your question data here.</div>
            default:
              return null
          }
        }}
      </>
    )
  }
}

export default QuestionTimer

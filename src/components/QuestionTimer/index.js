import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import OptionData from '../../Context/OptionData'
import Questions from '../Question'
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
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOptionData()
  }

  onClickRetryButton = () => {
    this.getOptionData()
  }

  getOptionData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/assess/questions'

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const fetchData = await response.json()

      const formattedData = fetchData.questions.map(item => ({
        id: item.id,
        questionText: item.question_text,
        optionsType: item.options_type,
        options: item.options.map(option => ({
          id: option.id,
          text: option.text,
          imageUrl: option.image_url || null, // Add imageUrl for IMAGE type
          isCorrect: option.is_correct === 'true',
        })),
      }))

      const {updateQuestions} = this.context
      updateQuestions(formattedData)
      this.setState({apiStatus: apiStatusConstants.success})
    } catch (error) {
      console.error('Fetch error:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color="#263868"
        height={50}
        width={50}
        aria-label="Loading questions"
      />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src={someThingWentWrong}
        alt="Something went wrong"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something went wrong</h1>
      <button
        type="button"
        onClick={this.onClickRetryButton}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => <Questions />

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }
}

QuestionTimer.contextType = OptionData
export default QuestionTimer

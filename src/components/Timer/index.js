import {Component} from 'react'
import './index.css'
import {withRouter} from 'react-router-dom'
// import OptionData from '../../Context/optionData'

class Timer extends Component {
  state = {
    count: 600, // 10 minutes in seconds
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timerId) // Clear timer when unmounted
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.count <= 0) {
          clearInterval(this.timerId)
          const {history} = this.props
          history.push('/results')
          return {count: 0} // Stop at 00:00
        }
        return {count: prevState.count - 1}
      })
    }, 1000)
  }

  formatTime = seconds => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(secs).padStart(2, '0')}`
  }

  render() {
    const {count} = this.state
    return (
      <div className="timer-10min">
        <h2 className="timer-left">Time Left:</h2>
        <h2 className="timer-heading"> {this.formatTime(count)}</h2>
      </div>
    )
  }
}

export default withRouter(Timer)

import {Component} from 'react'
import Cookies from 'js-cookie'

import logo from '../imgs/logo.svg'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    checkBox: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserValue = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordValue = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckBoxValue = () => {
    this.setState(prevState => ({checkBox: !prevState.checkBox}))
  }

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  handelformSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const URL = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(URL, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <div>
        <label className="username-label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="username-input"
          value={username}
          id="username"
          type="text"
          onChange={this.onChangeUserValue}
          placeholder="Enter Username"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password, checkBox} = this.state
    return (
      <div>
        <label className="password-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="password-input"
          value={password}
          id="password"
          type={checkBox ? 'text' : 'password'}
          onChange={this.onChangePasswordValue}
          placeholder="Enter Password"
        />
      </div>
    )
  }

  renderCheckBox = () => (
    <div>
      <input
        type="checkbox"
        onChange={this.onChangeCheckBoxValue}
        id="checkBox-val"
      />
      <label className="show-password" htmlFor="checkBox-val">
        Show Password
      </label>
    </div>
  )

  render() {
    const {errorMsg, showSubmitError} = this.state
    return (
      <div className="login-container">
        <div className="login-form">
          <img src={logo} className="nxt-logo" alt="logo" />
          <form onSubmit={this.handelformSubmit}>
            {this.renderUserName()}
            {this.renderPassword()}
            {this.renderCheckBox()}
            <button className="submit-button" type="submit">
              Submit
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login

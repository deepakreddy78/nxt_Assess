import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    checkBox: false,
  }

  onChangeUserValue = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordValue = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckBoxValue = () => {
    this.setState(preVal => ({checkBox: !preVal.checkBox}))
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
        />
      </div>
    )
  }

  renderCheckBox = () => (
    <div>
      <input
        type="checkBox"
        onChange={this.onChangeCheckBoxValue}
        id="checkBox-val"
      />
      <label className="show-password" htmlFor="checkBox-val">
        Show Password
      </label>
    </div>
  )

  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <img
            src="https://www.figma.com/347c1cda-0813-45d0-9af7-da78084fb008"
            alt="logo"
          />

          {this.renderUserName()}
          {this.renderPassword()}
          {this.renderCheckBox()}
          <button type="button">Submit</button>
        </div>
      </div>
    )
  }
}

export default Login

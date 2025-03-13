import {Component} from 'react'
// import Cookies from 'js-cookie'

import whitelogo from '../imgs/whitelogo.svg'

import './index.css'

class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar-container">
        <img src={whitelogo} className="nav-logo" alt="logo" />
        <button className="logout-button" type="button">
          Logout
        </button>
      </div>
    )
  }
}

export default NavBar

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {OptionProvider} from './Context/OptionData'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <OptionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OptionProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

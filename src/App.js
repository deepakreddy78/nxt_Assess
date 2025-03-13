import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
// import ProtectedRoute from './components/Protect/ProtechRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route path="/" component={Home} />
  </Switch>
)

export default App

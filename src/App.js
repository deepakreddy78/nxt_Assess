import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import QuestionTimer from './components/QuestionTimer'
import ProtectedRoute from './components/Protect/ProtechRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute path="/" component={Home} />
    <ProtectedRoute path="assessment" component={QuestionTimer} />
  </Switch>
)

export default App

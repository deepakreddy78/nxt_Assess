import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Assessment from './components/Assessment'
import ProtectedRoute from './components/Protect/ProtechRoute'
import Submit from './components/Submit'
import Result from './components/Result'
import PageNotFound from './components/PageNotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/assessment" component={Assessment} />
    <ProtectedRoute exact path="/submit" component={Submit} />
    <ProtectedRoute exact path="/results" component={Result} />
    <ProtectedRoute path="/not-found" component={PageNotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import ListOfUsers from './components/ListOfUsers'
import singleUsers from './components/singleUsers'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListOfUsers} />
        <Route path="/:username" component={singleUsers} />
      </Switch>
    </Router>
  )
}

export default App

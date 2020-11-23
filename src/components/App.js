import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import "../App.css"
import Dashboard from "./Dashboard"
import NewQuestion from "./NewQuestion"
import Navbar from "./Navbar"
import Login from "./Login"
import Logout from "./Logout"
import Question from "./Question"
import Leaderboard from "./LeaderBoard"


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())

  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <div className="App">
            {this.props.authUser === null
              ? <Login /> :
              <div>
                <div className="topBar">
                  <Navbar />
                  <div id="name">
                    <p>Hello, {this.props.user.name}</p>
                    <img src={this.props.user.avatarURL} />
                  </div>
                </div>

                <Route path='/' exact component={Dashboard} />
                <Route path='/new' exact component={NewQuestion} />
                <Route path='/logout' exact component={Logout} />
                <Route path='/question/:id' component={Question} />
                <Route path='/leaderboard' component={Leaderboard} />

              </div>
            }

          </div>
        </Router>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ authUser, users }) {
  const user = users[authUser]
  return {
    loading: authUser === null,
    authUser,
    user,
  }
}



export default connect(mapStateToProps)(App)
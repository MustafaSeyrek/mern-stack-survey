import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import store from './store';
import CreateSurvey from './components/CreateSurvey/CreateSurvey';
import MySurveys from './components/MySurveys/MySurveys';
import AllSurveys from './components/AllSurveys/AllSurveys';
import TakeSurvey from './components/TakeSurvey/TakeSurvey';
import ViewResults from './components/ViewResults/ViewResults';
import ViewSurvey from './components/ViewSurvey/ViewSurvey';

class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('_ID')) {
      axios.get(`/api/users/${localStorage.getItem('_ID')}`).then(res => {
        store.dispatch({
          user: res.data.user,
          type: 'set_user'
        })
      }).catch(er => {
        console.log(er)
      })
    }
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create-survey" component={CreateSurvey} />
            <Route path="/my-surveys" component={MySurveys} />
            <Route path="/all-surveys" component={AllSurveys} />
            <Route path="/take-survey" component={TakeSurvey} />
            <Route path="/view-results" component={ViewResults} />
            <Route path="/view-survey" component={ViewSurvey} />

            <Route path="*">
              <Redirect to="/" />
            </Route>

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

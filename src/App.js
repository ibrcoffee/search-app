import React from 'react';
import './App.css';

import Search from './components/Search';
import Results from './components/Results';

import { Switch, Route, HashRouter } from "react-router-dom";
import { Redirect } from "react-router";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };
    this.setResults = this.setResults.bind(this);
  }

  setResults(results) {
    this.setState({
      results: results
    });
  }
  
  render() {
    return (
      <div className="App bg">
        <HashRouter >
          <Switch>
            <Route 
              path="/search" 
              component={(props) => <Search
                { ...props }
                setResults={this.setResults}
              />} 
              />
            <Route 
              path="/results" 
              component={(props) => <Results
                { ...props }
                results={this.state.results}
              />} 
              />
            <Redirect to="/search" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;

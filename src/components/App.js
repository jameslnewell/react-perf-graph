import React, {Component} from 'react';
import Helmet from 'react-helmet';
import TwoColumnLayout from './TwoColumnLayout';
import ActivityList from './ActivityList';
import ActivityGraph from './ActivityGraph';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header className="site-header">
          <span className="site-header__title">
            react-perf-graph
          </span>
          <span className="site-header__badge">
            <a className="github-button" href="https://github.com/jameslnewell/react-perf-graph/fork" aria-label="Fork jameslnewell/react-perf-graph on GitHub">
              Fork
            </a>
          </span>
        </header>
        <Helmet titleTemplate="react-perf-graph - %s" title="Graph the results of `react-addons-perf`."/>
        <TwoColumnLayout>
          <ActivityList/>
          <ActivityGraph/>
        </TwoColumnLayout>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </div>
    );
  }
}

export default App;

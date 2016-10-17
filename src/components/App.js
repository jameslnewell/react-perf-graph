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
        <Helmet titleTemplate="react-perf-graph - %s" title="Graph the results of `react-addons-perf`."/>
        <TwoColumnLayout>
          <ActivityList/>
          <ActivityGraph/>
        </TwoColumnLayout>
      </div>
    );
  }
}

export default App;

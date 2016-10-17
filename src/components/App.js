import React, {Component} from 'react';
import TwoColumnLayout from './TwoColumnLayout';
import ActivityList from './ActivityList';
import ActivityGraph from './ActivityGraph';
import './App.css';

class App extends Component {
  render() {
    return (
      <TwoColumnLayout>
        <ActivityList/>
        <ActivityGraph/>
      </TwoColumnLayout>
    );
  }
}

export default App;

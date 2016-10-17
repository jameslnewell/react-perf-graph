import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import randomcolor from 'randomcolor';
import {getSelectedActivity} from '../../reducer';
import {addActivityStats} from '../../actions';
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line} from 'recharts';

const mapStateToProps = (state, props) => ({
  activity: getSelectedActivity(state)
});

const mapDispatchToProps = {
  addActivityStats
};

class ActivityGraph extends React.Component {

  getGraphData() {
    //TODO: filter by name
    const metric = 'Render count';
    return this.props.activity.changes.map(change => ({
      change: change.name,
      ...change.stats.reduce((accum, stat) => ({
        ...accum,
        [stat['Owner > Component']]: stat[metric]
      }), {})
    }));
  }

  getGraphLines() {
    //TODO: filter by name
    //TODO: come up with a color

    if (this.props.activity.changes.length === 0) {
      return [];
    }

    return this.props.activity.changes[0].stats.map(stat => stat['Owner > Component'])
      .filter((item, i) => i<5)
    ;
  }

  handleAddStats() {
    let stats = null;

    const answer = prompt('Please enter the `Perf.printWasted()` stats as JSON:');
    if (!answer) {
      return;
    }

    try {
      stats = JSON.parse(answer);
    } catch (error) {
      console.error(stats);
      return;
    }

    this.props.addActivityStats(this.props.activity.id, stats);
  }

  render() {
    const {activity} = this.props;

    if (!activity) {
      return <p>No activity is selected... Select an activity to view the change over time.</p>
    }

    return (
      <div className="activity-graph">
        <Helmet title={activity.name}/>
        <h4>{activity.name}</h4>
        <h5>Render count</h5>

        <LineChart width={600} height={600} margin={{top: 5, right: 30, left: 20, bottom: 5}} data={this.getGraphData()}>
          <XAxis dataKey="change"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="6 6"/>
          <Tooltip/>
          <Legend />
          {this.getGraphLines().map(line => <Line type="monotone" dataKey={line} key={line} stroke={randomcolor()}/>)}
        </LineChart>

        <button onClick={this.handleAddStats.bind(this)}>+ Add stats</button>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityGraph);

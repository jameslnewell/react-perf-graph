import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import randomcolor from 'randomcolor';
import {getSelectedActivity} from '../../reducer';
import {addActivityStats} from '../../actions';
import {LineChart, XAxis, YAxis, CartesianGrid, Line} from 'recharts';
import './index.css';

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
    return this.props.activity.changes.map((change, index) => ({
      change: change.name || index,
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

    return this.props.activity.changes[0].stats.map(stat => ({
      label: stat['Owner > Component'],
      color: randomcolor()
    }))
      // .filter((item, i) => i<10)
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

    const lines = this.getGraphLines();

    return (
      <div className="graph-content" style={{display: 'flex', 'flexDirection': 'column', height: '100%'}}>
        <Helmet title={activity.name}/>
        <h4>{activity.name}</h4>
        <h5>Render count</h5>

        <div className="activity-graph" style={{flexGrow: 1}}>
          <LineChart width={1200} height={600} data={this.getGraphData()}>
            <XAxis dataKey="change"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="6 6"/>
            {/* TODO: how to get the tooltip just showing the name of the line <Tooltip content={<CustomTooltip/>}/> */}
            {/*}<Legend />*/}
            {lines.map(line => (
              <Line key={line.label} dataKey={line.label} stroke={line.color} type="monotone"/>  
            ))}
          </LineChart>
        </div>

        <div className="graph-legend">
          {lines.map(line => (
            <label className="graph-legend__line" style={{color: line.color}}>
              {line.label}
            </label>
          ))}
        </div>

        <button onClick={this.handleAddStats.bind(this)}>+ Add stats</button>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityGraph);

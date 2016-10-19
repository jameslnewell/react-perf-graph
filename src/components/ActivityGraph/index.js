import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import randomcolor from 'randomcolor';
import objectValues from 'object-values';
import {VictoryChart, VictoryAxis, VictoryGroup, VictoryLine, VictoryScatter, VictoryTooltip} from 'victory';
import {getSelectedActivity} from '../../reducer';
import {addActivityStats} from '../../actions';
import './index.css';

const mapStateToProps = (state, props) => ({
  activity: getSelectedActivity(state)
});

const mapDispatchToProps = {
  addActivityStats
};

class ActivityGraph extends React.Component {

  getGraphLines() {
    //TODO: filter by name
    //TODO: come up with a color

    const lines = {};

    if (this.props.activity.changes.length === 0) {
      return [];
    }

    this.props.activity.changes.forEach((change, index) => {

      change.stats.forEach(stat => {
        const label = stat['Owner > Component'];

        if (!lines[label]) {
          lines[label] = {
            label,
            color: randomcolor(),
            data: []
          };
        }

        lines[label].data.push({
          x: index,
          y: stat['Render count'],
          label
        });

      });

    });

    return objectValues(lines);
  }

  getTickValuesForXAxis() {
    return this.props.activity.changes.map((_, index) => index);
  }

  getTickLabelForXAxis(index) {
    return this.props.activity.changes[index]
      ? this.props.activity.changes[index].label || index
      : index
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
          <VictoryChart>
          <VictoryAxis
            style={{
              ticks: {stroke: 'black', size: 4},
              tickLabels: {fontSize: 5}
            }}
            tickValues={this.getTickValuesForXAxis()}
            tickFormat={this.getTickLabelForXAxis.bind(this)}
          />
          <VictoryAxis dependentAxis
            style={{
              ticks: {stroke: 'black', size: 4},
              tickLabels: {fontSize: 5}
            }}
          />
          {lines.map(line => (
            <VictoryGroup key={line.label} data={line.data} labelComponent={<VictoryTooltip/>}>
              <VictoryLine
                style={{
                  data: {
                    stroke: line.color,
                    strokeWidth: 1
                  }
                }}
              />
              <VictoryScatter
                size={1.5}
                style={{
                  data: {
                    fill: line.color
                  }
                }}
              />
            </VictoryGroup>
          ))}
          </VictoryChart>
        </div>

        <div className="graph-legend">
          {lines.map(line => (
            <label key={line.label} className="graph-legend__line" style={{color: line.color}}>
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

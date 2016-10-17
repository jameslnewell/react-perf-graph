import React from 'react';
import {connect} from 'react-redux';
import {getActivities, getSelectedActivity} from '../../reducer';
import {createActivity, selectActivity} from '../../actions';
import './index.css';

const mapStateToProps = state => ({
  selectedActivity: getSelectedActivity(state),
  activities: getActivities(state)
});

const mapDispatchToProps = {
  createActivity,
  selectActivity
};

class ActivityList extends React.Component {

  handleAdd() {
    const answer = prompt('What is the name of your activity?');
    if (answer) {
      this.props.createActivity(answer);
    }
  }

  handleSelect(event) {
    this.props.selectActivity(event.target.value);
  }

  render() {
    const {selectedActivity, activities} = this.props;
    return (
      <div>

        <h4>Activities</h4>

        <select multiple className="activity-list" onChange={this.handleSelect.bind(this)} defaultValue={[selectedActivity.id]}>
        {activities.map(activity => (
          <option key={activity.id} value={activity.id}>
            {activity.name}
          </option>
        ))}
        </select>

        <button onClick={this.handleAdd.bind(this)}>+ Add activity</button>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);

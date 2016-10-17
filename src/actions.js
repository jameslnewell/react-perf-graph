import shortid from 'shortid';
import * as constants from './constants';

export const createActivity = name => ({
  type: constants.ADD_ACTIVITY,
  payload: {
    id: shortid(),
    name
  }
});

export const selectActivityById = id => ({
  type: constants.SELECT_ACTIVITY,
  payload: {
    id
  }
});
export const removeActivityById = id => ({
  type: constants.REMOVE_ACTIVITY,
  payload: {
    id
  }
});

export const addActivityStats = (id, stats) => ({
  type: constants.ADD_ACTIVITY_STATS,
  payload: {
    id,
    stats
  }
});

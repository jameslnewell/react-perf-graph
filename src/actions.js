import shortid from 'shortid';

export const createActivity = name => ({
  type: 'add_activity',
  payload: {
    id: shortid(),
    name
  }
});

export const selectActivity = id => ({
  type: 'select_activity',
  payload: {
    id
  }
});

export const addActivityStats = (id, stats) => ({
  type: 'add_activity_stats',
  payload: {
    id,
    stats
  }
});

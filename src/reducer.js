import {combineReducers} from 'redux';
import omit from 'lodash.omit';
import * as constants from './constants';

export default combineReducers({
  activities: combineReducers({

    byId: (state = {}, action = {}) => {
      switch (action.type) {

        case constants.ADD_ACTIVITY:
          return {
            ...state,
            [action.payload.id]: {
              id: action.payload.id,
              name: action.payload.name,
              changes: []
            }
          };

        case constants.REMOVE_ACTIVITY:
          return omit(state, action.payload.id);

        case constants.ADD_ACTIVITY_STATS:
          return {
            ...state,
            [action.payload.id]: {
              ...state[action.payload.id],
              changes: [
                ...state[action.payload.id].changes,
                {
                  stats: action.payload.stats
                }
              ]
            }
          };

        default:
          return state;

      }
    },

    selectedId: (state = null, action = {}) => {
      switch (action.type) {

        case constants.ADD_ACTIVITY:
          return action.payload.id;

        case constants.SELECT_ACTIVITY:
          return action.payload.id;

        case constants.REMOVE_ACTIVITY:
          if (action.payload.id === state) {
            return null;
          } else {
            return state;
          }

        default:
          return state;

      }
    }

  })
});

export const getActivity = (state, id) => state.activities.byId[id] || null;
export const getActivities = state => Object.keys(state.activities.byId).map(id => getActivity(state, id));
export const getSelectedActivity = state => state.activities.selectedId ? getActivity(state, state.activities.selectedId) : null;

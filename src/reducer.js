import {combineReducers} from 'redux';

export default combineReducers({

  activities: combineReducers({

    byId: (state = {}, action = {}) => {
      switch (action.type) {

        case 'add_activity':
          return {
            ...state,
            [action.payload.id]: {
              id: action.payload.id,
              name: action.payload.name,
              changes: []
            }
          };

        case 'add_activity_stats':
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

        case 'select_activity':
          return action.payload.id;

        default:
          return state;

      }
    }

  })

});

export const getActivity = (state, id) => state.activities.byId[id] || null;
export const getActivities = state => Object.keys(state.activities.byId).map(id => getActivity(state, id));
export const getSelectedActivity = state => state.activities.selectedId ? getActivity(state, state.activities.selectedId) : null;

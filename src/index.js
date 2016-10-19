import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducer';
import App from './components/App';
import './index.css';
// import Perf from 'react-addons-perf';
// window.Perf = Perf;

const store = createStore(reducer, {
  activities: localStorage['activities'] ? JSON.parse(localStorage['activities']) : {}
});

store.subscribe(
  () => localStorage['activities'] = JSON.stringify(store.getState().activities)
);

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('root')
);

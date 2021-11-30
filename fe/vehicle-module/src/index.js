import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Sadrzaj } from './Sadrzaj';
import {createStore } from "redux"
import { allReducers } from './state/reducers';
import { Provider } from 'react-redux';

const store = createStore(allReducers)

ReactDOM.render(
  <Provider store={store} >
    <Sadrzaj />
  </Provider>,
  document.getElementById('root')
);


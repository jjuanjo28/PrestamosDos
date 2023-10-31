import React from 'react';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from "redux"
import AppNavigator from './navigation/AppNavigator';
import promiseMiddleware from "redux-promise"


const App = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(promiseMiddleware)
  )(createStore)
  return (
    <Provider store={createStoreWithMiddleware(reducers)}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

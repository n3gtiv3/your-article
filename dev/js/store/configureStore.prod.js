import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'react-redux';

export default function configureStore(initialState) {
  return createStore(rootReducer, applyMiddleware(thunk), initialState);
}

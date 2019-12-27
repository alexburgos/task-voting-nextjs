import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { authReducer, userReducer, pollsReducer } from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
  authentication: authReducer,
  user: userReducer,
  polls: pollsReducer
});

const logger = createLogger({
  collapsed: true
});

export default createStore(
  reducers,
  process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk, logger)): applyMiddleware(thunk)
);

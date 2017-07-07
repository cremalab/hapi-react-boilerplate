import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'

import tasks from './reducers/tasks'

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    tasks,
    router: routerReducer
  }),
  applyMiddleware(thunk, middleware)
)

export { store as default, history }

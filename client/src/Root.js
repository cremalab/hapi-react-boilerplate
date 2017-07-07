import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store, { history } from 'store'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import Initializer from 'components/Initializer'
import RouteApp from 'components/RouteApp'

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Initializer>
          <ConnectedRouter history={history}>
            <Route component={RouteApp} />
          </ConnectedRouter>
        </Initializer>
      </Provider>
    )
  }
}

export default Root

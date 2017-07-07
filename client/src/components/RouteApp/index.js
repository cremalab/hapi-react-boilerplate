import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import RouteHome from '../RouteHome'

const RouteApp = () =>
  <Route exact path="/" component={RouteHome}/>


RouteApp.propTypes = {
  push: PropTypes.func,
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(RouteApp)

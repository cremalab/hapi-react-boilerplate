import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Use this Component to do any one-time app startup jobs

class Initializer extends Component {
  componentDidMount() {
    // Do stuff here...
  }

  render() {
    return Children.only(this.props.children)
  }
}

Initializer.propTypes = {
  children: PropTypes.any
}

export default connect(
  null,
  { }
)(Initializer)

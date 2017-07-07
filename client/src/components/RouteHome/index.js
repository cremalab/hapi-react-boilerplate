import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import tasksAdd from '../../store/actions/tasksAdd'

class RouteHome extends Component {
  componentDidMount() {
    const { tasksAdd } = this.props
    tasksAdd({ completed: false, title: 'Remove this junk'})
  }

  render() {
    const { list } = this.props.tasks
    return (
      <div>
        <h1>Home component!</h1>
        <ul>
          { list.map((t, i) => (
            <li key={i}>
              <input type='checkbox' checked={t.completed} />
              &nbsp;
              {t.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

RouteHome.propTypes = {
  tasks: PropTypes.object,
  tasksAdd: PropTypes.func,
}

const mapStateToProps = state => ({
  tasks: state.tasks,
})

export default connect(mapStateToProps, { tasksAdd })(RouteHome)

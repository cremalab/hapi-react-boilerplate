import { handleActions } from 'redux-actions'
import types from '../../actionTypes'

export const initialState = {
  list: [],
}

const addTask = (state, action) => {
  const { payload } = action
  return {
    ...state,
    list: [...state.list, payload]
  }
}

export default handleActions({
  [types.TASKS_ADD]: addTask,
}, initialState)

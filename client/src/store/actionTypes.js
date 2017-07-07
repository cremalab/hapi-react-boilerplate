// All action types are mapped to constants here
const actionTypes = [
  'TASKS_ADD',
]

const mapToConst = (types) => types.reduce((mem, name) => {
  mem[name] = name
  return mem
}, {})

export default mapToConst(actionTypes)

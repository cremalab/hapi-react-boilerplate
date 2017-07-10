import React from 'react'
import { shallow } from 'enzyme'
import RouteApp from './'
import store from '../../store'

const wrapper = shallow(<RouteApp store={store}/>)

describe('(Component) RouteApp', () => {
  it('renders without exploding', () => {
    expect(wrapper.length).toEqual(1)
  })
})

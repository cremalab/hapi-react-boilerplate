import React from 'react'
import { shallow } from 'enzyme'
import RouteHome from './'
import store from '../../store'

const wrapper = shallow(<RouteHome store={store}/>)

describe('(Component) RouteHome', () => {
  it('renders without exploding', () => {
    expect(wrapper.length).toEqual(1)
  })
})

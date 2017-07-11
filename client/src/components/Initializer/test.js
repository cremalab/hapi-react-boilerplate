import React from 'react'
import { shallow } from 'enzyme'
import Initializer from './'
import store from '../../store'

const wrapper = shallow(<Initializer store={store}/>)

describe('(Component) Initializer', () => {
  it('renders without exploding', () => {
    expect(wrapper.length).toEqual(1)
  })
})

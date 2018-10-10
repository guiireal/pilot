import React from 'react'
import { action } from '@storybook/addon-actions'

import QuantityComponent from '../../../src/components/QuantityInput'
import Section from '../../Section'

const actionChange = action('change')

class QuantityInput extends React.Component {
  constructor () {
    super()

    this.state = {
      value: 1,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    this.setState({
      value,
    }, () => actionChange(this.state.value))
  }

  render () {
    return (
      <Section>
        <QuantityComponent
          label="Quantity"
          name="quantity"
          onBlur={action('blur')}
          onChange={this.handleChange}
          size="tiny"
          value={this.state.value}
        />
      </Section>
    )
  }
}

export default QuantityInput

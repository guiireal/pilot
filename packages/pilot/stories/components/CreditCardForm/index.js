import React from 'react'
import { Card } from 'former-kit'
import { complement, isEmpty } from 'ramda'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import CreditCardForm from '../../../src/containers/CreateTransaction/Payment/CreditCard'

const actionChange = action('change')

const hasErrors = complement(isEmpty)

const setStateData = (name, { value }) =>
  ({ creditCard }) => ({
    creditCard: {
      ...creditCard,
      [name]: value,
    },
  })

class CreditCard extends React.Component {
  constructor () {
    super()

    this.state = {
      creditCard: {
        capture: true,
        cardNumber: '',
        cvv: '',
        expirationDate: '',
        holderName: '',
        installments: '',
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeCapture = this.handleChangeCapture.bind(this)
    this.handleChangeWithMask = this.handleChangeWithMask.bind(this)
  }

  handleChange (data, errors) {
    if (!hasErrors(errors)) {
      this.setState({
        creditCard: data,
      }, () => actionChange(this.state.creditCard))
    }
  }

  handleChangeWithMask (name) {
    return ({ target }) => this.setState(setStateData(name, target))
  }

  handleChangeCapture () {
    const { creditCard } = this.state

    this.setState({
      creditCard: {
        ...creditCard,
        capture: !creditCard.capture,
      },
    })
  }

  render () {
    const { creditCard } = this.state

    return (
      <Section>
        <Card>
          <CreditCardForm
            data={creditCard}
            installmentsOptions={[
              { name: '1x sem juros', value: '1' },
              { name: '2x sem juros', value: '2' },
              { name: '3x sem juros', value: '3' },
            ]}
            onChange={this.handleChange}
            onChangeWithMask={this.handleChangeWithMask}
            onChangeCapture={this.handleChangeCapture}
            t={t => t}
          />
        </Card>
      </Section>
    )
  }
}

export default CreditCard

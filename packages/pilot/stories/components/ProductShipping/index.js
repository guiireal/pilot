import React from 'react'
import { Card } from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import ShippingFormComponent from '../../../src/containers/CreateTransaction/Products/Shipping'

const ShippingForm = () => (
  <Section>
    <Card>
      <ShippingFormComponent
        onChange={action('change')}
        t={t => t}
      />
    </Card>
  </Section>
)

export default ShippingForm

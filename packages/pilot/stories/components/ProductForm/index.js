import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import ProductFormComponent from '../../../src/containers/CreateTransaction/Products/Add'
import Section from '../../Section'

const actionAddProduct = action('add product')

class ProductForm extends Component {
  constructor () {
    super()

    this.state = {
      product: {},
    }

    this.handleAddProducts = this.handleAddProducts.bind(this)
  }

  handleAddProducts (data) {
    this.setState({
      product: data,
    }, () => actionAddProduct(this.state.product))
  }

  render () {
    return (
      <Section>
        <Card>
          <ProductFormComponent
            onAdd={this.handleAddProducts}
            t={t => t}
          />
        </Card>
      </Section>
    )
  }
}

export default ProductForm

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import ProductsListComponent from '../../../src/containers/CreateTransaction/Products/List'

const actionRemoveProdut = action('remove product')

class ProductsList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      products: props.products,
    }

    this.handleRemoveProduct = this.handleRemoveProduct.bind(this)
  }

  handleRemoveProduct (id) {
    this.setState(({ products }) => ({
      products: products.filter(product => id !== product.id),
    }), () => actionRemoveProdut(this.state.products))
  }

  render () {
    const { products } = this.state

    return (
      <Section>
        <ProductsListComponent
          products={products}
          onRemoveProduct={this.handleRemoveProduct}
          t={t => t}
        />
      </Section>
    )
  }
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  })).isRequired,
}

export default ProductsList

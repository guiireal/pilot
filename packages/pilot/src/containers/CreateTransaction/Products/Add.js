import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  complement,
  filter,
  isEmpty,
  pipe,
} from 'ramda'
import {
  Button,
  CardContent,
  CardSection,
  Checkbox,
  Col,
  FormInput,
  Row,
} from 'former-kit'
import Form from 'react-vanilla-form'

import CurrencyInput from '../../../components/CurrencyInput'
import QuantityInput from '../../../components/QuantityInput'

import required from '../../../validation/required'
import lte from '../../../validation/lessThanOrEqual'

import style from './style.css'

const validations = t => ({
  title: required(t('required')),
  id: required(t('required')),
  unit_price: required(t('required')),
  quantity: [
    required(t('required')),
    lte(0, t('add_transaction_products_quantity_error')),
  ],
})

const hasEmptyValues = pipe(
  filter(isEmpty),
  complement(isEmpty)
)

const hasErrors = complement(isEmpty)

class ProductsForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: {},
      product: props.data,
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeTangible = this.onChangeTangible.bind(this)
  }

  onSubmit (data, errors) {
    if (!errors) {
      this.setState({
        product: data,
      }, () => {
        this.props.onAdd(this.state.product)

        /** reset form after add the new product */
        this.setState({
          product: {
            id: '',
            quantity: 1,
            title: '',
            unitPrice: '',
            tangible: false,
          },
        })
      })
    }
  }

  onChange (data, errors) {
    this.setState({
      product: data,
      errors,
    })
  }

  onChangeTangible () {
    const { product } = this.state

    this.setState({
      product: {
        ...product,
        tangible: !product.tangible,
      },
    })
  }

  render () {
    const { t } = this.props

    const { errors, product } = this.state

    return (
      <CardSection>
        <CardContent>
          <Form
            data={product}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            validation={validations(t)}
            validateOn="change"
          >
            <Row className={style.row} flex stretch>
              <Col className={style.fields} desk={3}>
                <FormInput
                  name="title"
                  label={t('add_transaction_products_description')}
                />
              </Col>

              <Col className={style.fields} desk={1}>
                <FormInput
                  name="id"
                  label={t('add_transaction_products_id')}
                />
              </Col>

              <Col className={style.fields} desk={2}>
                <FormInput
                  name="unitPrice"
                  label={t('add_transaction_products_unit_price')}
                  renderer={props => (
                    <CurrencyInput {...props} />
                  )}
                />
              </Col>

              <Col>
                <QuantityInput
                  label={t('add_transaction_prducts_quantity')}
                  size="tiny"
                  name="quantity"
                />
              </Col>

              <Col
                align="center"
                className={
                  classnames(
                    style.checkboxLabel,
                    style.realignCheckbox
                  )
                }
                desk={2}
              >
                <Checkbox
                  checked={product.tangible}
                  label={t('add_transaction_products_tangible')}
                  name="tangible"
                  onChange={this.onChangeTangible}
                  value="tangible"
                />
              </Col>

              <Col
                align="end"
                className={style.realignButton}
                desk={3}
              >
                <Button
                  disabled={hasEmptyValues(product) || hasErrors(errors)}
                  fill="outline"
                  type="submit"
                >
                  {t('add_transaction_products_confirm')}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardContent>
      </CardSection>
    )
  }
}

const ProductShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  tangible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  unitPrice: PropTypes.string.isRequired,
})

ProductsForm.propTypes = {
  data: ProductShape,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ProductsForm.defaultProps = {
  data: {
    id: '',
    quantity: 1,
    tangible: false,
    title: '',
    unitPrice: '',
  },
}

export default ProductsForm

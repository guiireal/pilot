import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  complement,
  contains,
  equals,
  split,
  when,
} from 'ramda'
import {
  CardContent,
  CardTitle,
  Col,
  FormDropdown,
  FormInput,
  Row,
} from 'former-kit'
import Form from 'react-vanilla-form'
import CurrencyInput from '../../../components/CurrencyInput'
import style from './style.css'

import isRequired from '../../../validation/required'
import lt from '../../../validation/lessThan'

import statesModel from '../../../models/states'
import countriesModel from '../../../models/countries'

const stateOptions = statesModel.map(state => ({
  name: state.code,
  value: state.code,
}))

const countriesOptions = countriesModel.map(country => ({
  name: country.name,
  value: country.code,
}))

const validations = t => ({
  address: {
    city: isRequired(t('required')),
    country: isRequired(t('required')),
    state: isRequired(t('required')),
    street: isRequired(t('required')),
    streetNumber: isRequired(t('required')),
    zipcode: isRequired(t('required')),
  },
  fee: [isRequired(t('required')), lt(0, t('positive_value'))],
  name: isRequired(t('required')),
})

const splitNameIfHasDot = when(
  contains('.'),
  split('.')
)

const setStateData = (inputName, { value }) => {
  const name = splitNameIfHasDot(inputName)

  if (typeof name === 'string') {
    return (
      ({ data }) => ({
        data: {
          ...data,
          [name]: value,
        },
      })
    )
  }

  const [parent, key] = name

  return ({ data }) => ({
    data: {
      ...data,
      [parent]: {
        ...data[parent],
        [key]: value,
      },
    },
  })
}

const hasChanged = complement(equals)

class ShippingForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: props.data,
      errors: {},
    }

    this.onChange = this.onChange.bind(this)
    this.onChangeWithMask = this.onChangeWithMask.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    const { onChange } = this.props

    if (onChange && hasChanged(prevState, this.state)) {
      onChange(this.state.data, this.state.errors)
    }
  }

  onChange (data, errors) {
    this.setState({
      data,
      errors,
    })
  }

  onChangeWithMask (name) {
    return ({ target }) => this.setState(setStateData(name, target))
  }

  render () {
    const { t } = this.props
    const { data } = this.state

    return (
      <Fragment>
        <CardTitle title={t('add_transaction_shipping_title')} />

        <CardContent>
          <Form
            data={data}
            onChange={this.onChange}
            validation={validations(t)}
            validateOn="blur"
          >
            <fieldset className={style.fieldset} name="address">
              <Row>
                <Col desk={2}>
                  <FormInput
                    name="zipcode"
                    label={t('add_transaction_shipping_zipcode')}
                    mask="11111-111"
                    onChange={this.onChangeWithMask('address.zipcode')}
                  />
                </Col>

                <Col desk={3}>
                  <FormInput
                    name="street"
                    label={t('add_transaction_shipping_street')}
                  />
                </Col>

                <Col desk={1} className={style.fields}>
                  <FormInput
                    name="streetNumber"
                    label={t('add_transaction_shipping_street_number')}
                  />
                </Col>

                <Col desk={3}>
                  <FormInput
                    name="complementary"
                    label={t('add_transaction_shipping_complementary')}
                  />
                </Col>
              </Row>

              <Row>
                <Col desk={3}>
                  <FormInput
                    name="neighborhood"
                    label={t('add_transaction_shipping_neighborhood')}
                  />
                </Col>

                <Col desk={3}>
                  <FormInput
                    name="city"
                    label={t('add_transaction_shipping_city')}
                  />
                </Col>
                {(data.address.country === 'BR')
                  ? (
                    <Col desk={1}>
                      <FormDropdown
                        name="state"
                        label={t('add_transaction_shipping_state')}
                        options={stateOptions}
                      />
                    </Col>
                  ) : (
                    <Col desk={1} className={style.fields}>
                      <FormInput
                        name="state"
                        label={t('add_transaction_shipping_state')}
                      />
                    </Col>
                  )
                }

                <Col desk={2}>
                  <FormDropdown
                    name="country"
                    label={t('add_transaction_shipping_country')}
                    options={countriesOptions}
                    value={data.address.country}
                  />
                </Col>
              </Row>
            </fieldset>

            <Row>
              <Col desk={3}>
                <FormInput
                  name="name"
                  label={t('add_transaction_shipping_name')}
                />
              </Col>

              <Col desk={2}>
                <FormInput
                  name="deliveryDate"
                  label={t('add_transaction_shipping_delivery_date')}
                  mask="11/11/1111"
                  onChange={this.onChangeWithMask('deliveryDate')}
                />
              </Col>
            </Row>

            <Row>
              <Col desk={3}>
                <FormDropdown
                  name="expedited"
                  label={t('add_transaction_shipping_expedited')}
                  options={[
                    { name: t('add_transaction_shipping_expedited_normal'), value: 'normal' },
                    { name: t('add_transaction_shipping_expedited_expedited'), value: 'express' },
                  ]}
                  value={data.expedited || 'express'}
                />
              </Col>

              <Col desk={1}>
                <FormInput
                  name="fee"
                  label={t('add_transaction_shipping_fee')}
                  renderer={props => (
                    <CurrencyInput {...props} />
                  )}
                />
              </Col>
            </Row>
          </Form>
        </CardContent>
      </Fragment>
    )
  }
}

ShippingForm.propTypes = {
  data: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      complementary: PropTypes.string,
      country: PropTypes.string.isRequired,
      neighborhood: PropTypes.string,
      state: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      streetNumber: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
    }).isRequired,
    deliveryDate: PropTypes.string,
    expedited: PropTypes.oneOf(['express', 'normal']),
    fee: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ShippingForm.defaultProps = {
  data: {
    address: {
      city: '',
      complementary: '',
      country: 'BR',
      neighborhood: '',
      state: '',
      street: '',
      streetNumber: '',
      zipcode: '',
    },
    deliveryDate: '',
    expedited: 'express',
    fee: '',
    name: '',
  },
}

export default ShippingForm

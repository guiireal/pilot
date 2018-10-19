import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  CardContent,
  CardSection,
  CardTitle,
  Checkbox,
  Col,
  FormDropdown,
  FormInput,
  Row,
} from 'former-kit'

import isCVV from '../../../validation/cvv'
import isCreditCard from '../../../validation/creditCard'
import isRequired from '../../../validation/required'

import style from './style.css'

const validations = t => ({
  cvv: [isRequired(t('required')), isCVV('cvv_invalid')],
  expirationDate: isRequired(t('required')),
  holderName: isRequired(t('required')),
  installments: isRequired(t('required')),
  cardNumber: [
    isRequired(t('required')),
    isCreditCard(t('credit_card_invalid')),
  ],
})

const CreditCard = ({
  data,
  installmentsOptions,
  onChange,
  onChangeCapture,
  onChangeWithMask,
  t,
}) => (
  <CardSection>
    <CardTitle title={t('add_transaction_payment_title')} />

    <CardContent>
      <Form
        data={data}
        onChange={onChange}
        validation={validations(t)}
        validateOn="blur"
      >
        <Row>
          <Col tablet={10} desk={10}>
            <FormInput
              name="holderName"
              label={t('add_transaction_payment_holder')}
            />
          </Col>
        </Row>

        <Row>
          <Col tablet={6} desk={6}>
            <FormInput
              label={t('add_transaction_payment_card_number')}
              mask="1111 1111 1111 1111 1111"
              name="cardNumber"
              onChange={onChangeWithMask('cardNumber')}
            />
          </Col>

          <Col tablet={2} desk={2} className={style.fields}>
            <FormInput
              label={t('add_transaction_payment_expiration')}
              mask="11/11"
              name="expirationDate"
              onChange={onChangeWithMask('expirationDate')}
            />
          </Col>

          <Col tablet={2} desk={2} className={style.fields}>
            <FormInput
              label={t('add_transaction_payment_cvv')}
              mask="1111"
              name="cvv"
              onChange={onChangeWithMask('cvv')}
            />
          </Col>
        </Row>

        <Row>
          <Col tablet={6} desk={6}>
            <FormDropdown
              name="installments"
              options={installmentsOptions}
              label={t('add_transaction_payment_installments')}
            />
          </Col>

          <Col tablet={6} desk={6}>
            <FormInput
              name="description"
              label={t('add_transaction_payment_description')}
            />
          </Col>
        </Row>

        <Row>
          <Checkbox
            label={t('add_transaction_payment_capture')}
            name="capture"
            value="capture"
            onChange={onChangeCapture}
            checked={data.capture}
          />
        </Row>
      </Form>
    </CardContent>
  </CardSection>
)

CreditCard.propTypes = {
  data: PropTypes.shape({
    cvv: PropTypes.string.isRequired,
    expirationDate: PropTypes.string.isRequired,
    holderName: PropTypes.string.isRequired,
    installments: PropTypes.string.isRequired,
    cardNumber: PropTypes.string.isRequired,
    capture: PropTypes.bool.isRequired,
  }).isRequired,
  installmentsOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeCapture: PropTypes.func.isRequired,
  onChangeWithMask: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default CreditCard

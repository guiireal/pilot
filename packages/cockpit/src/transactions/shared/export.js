import {
  always,
  applySpec,
  complement,
  cond,
  either,
  head,
  ifElse,
  isEmpty,
  isNil,
  join,
  juxt,
  last,
  length,
  path,
  pathOr,
  pathSatisfies,
  pipe,
  prop,
  props,
  propEq,
  propOr,
  propSatisfies,
  splitAt,
  T,
  unless,
} from 'ramda'

const LIMITER = '-'

const propOrLimiter = propOr(LIMITER)

const isAntifraudScoreNil = propSatisfies(isNil, 'antifraud_score')

const isRefuseReasonNil = propSatisfies(isNil, 'refuse_reason')

const getCardProp = subProp => cond([
  [
    pathSatisfies(complement(isNil), ['card', subProp]),
    path(['card', subProp]),
  ],
  [
    propSatisfies(complement(isNil), `card_${subProp}`),
    prop(`card_${subProp}`),
  ],
  [T, always(LIMITER)],
])

const isRefuseReasonAntifraud = propEq('refuse_reason', 'antifraud')

const antifraudRecommendation = cond([
  [isAntifraudScoreNil, always(LIMITER)],
  [isRefuseReasonNil, always(LIMITER)],
  [isRefuseReasonAntifraud, always('refused')],
  [T, always('approved')],
])

const getAntifraudProp = ifElse(
  isAntifraudScoreNil,
  always(LIMITER),
  applySpec({
    recommendation: antifraudRecommendation,
    score: propOrLimiter('antifraud_score'),
  })
)

const getCustomerSubProp = subProp => pathOr(LIMITER, ['customer', subProp])

const getAddressSubProp = subProp => pathOr(LIMITER, [path(['billing', 'address']), subProp])

const getCaptureMethod = ifElse(
  propSatisfies(isNil, 'capture_method'),
  propOrLimiter('capture_method'),
  getCardProp('capture_method')
)

const getStatusReason = ifElse(
  propEq('status', 'refused'),
  propOrLimiter('refuse_reason'),
  propOrLimiter('status_reason')
)

const formatPhoneNumber = (number) => {
  if (!number) return ''
  const len = length(number) - 4
  return join('-', splitAt(len, number))
}

const formatPhoneProp = pipe(
  props(['ddd', 'number']),
  juxt([
    pipe(
      head,
      h => `(${h})`
    ),
    pipe(
      last,
      formatPhoneNumber
    ),
  ]),
  join(' ')
)

const getRecipients = pipe(
  propOrLimiter('split_rules'),
)

const getPhoneProp = pipe(
  propOrLimiter('phone'),
  ifElse(
    either(isNil, isEmpty),
    always(null),
    formatPhoneProp
  )
)

const getPhones = pipe(getPhoneProp)

const getId = unless(isNil, pipe(propOrLimiter('tid'), String))

const transactionSpec = {
  status: propOrLimiter('status'),
  id: getId,
  updated_at: propOrLimiter('date_updated'),
  name: getCustomerSubProp('name'),
  payment_method: propOrLimiter('payment_method'),
  first_digits: getCardProp('first_digits'),
  documents: propOrLimiter('document_number'),
  email: getCustomerSubProp('email'),
  subscription: propOrLimiter('subscription_id'),
  phones: getPhones,
  holder_name: getCardProp('holder_name'),
  status_reason: getStatusReason,
  ip: propOrLimiter('ip'),
  brand_name: getCardProp('brand'),
  amount: propOrLimiter('amount'),
  capture_method: getCaptureMethod,
  refund_amount: propOrLimiter('refunded_amount'),
  split_rules: getRecipients,
  street: getAddressSubProp('street'),
  streetNumber: getAddressSubProp('street_number'),
  complementary: getAddressSubProp('complementary'),
  neighborhood: getAddressSubProp('neighborhood'),
  zipcode: getAddressSubProp('zipcode'),
  city: getAddressSubProp('city'),
  state: getAddressSubProp('state'),
  antifraud: getAntifraudProp,
  risk_level: propOrLimiter('risk_level'),
}

export default transactionSpec


import isCreditCard from 'validator/lib/isCreditCard'

export default message => value =>
  !isCreditCard(value.replace(/[_]+/, '')) && message

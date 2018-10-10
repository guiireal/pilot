import React from 'react'
import PropTypes from 'prop-types'
import {
  complement,
  isNil,
  pipe,
  replace,
  when,
} from 'ramda'
import {
  Button,
  Flexbox,
  Input,
} from 'former-kit'
import IconAdd from 'emblematic-icons/svg/Add24.svg'
import IconRemove from 'emblematic-icons/svg/Remove24.svg'

import style from './style.css'

const hasValue = complement(isNil)
const removeNonDigitsChars = pipe(
  String,
  replace(/(?!-)[^0-9]/g, '')
)

const handleValue = when(
  hasValue,
  removeNonDigitsChars
)

const QuantityInput = ({
  label,
  name,
  error,
  onBlur,
  onChange,
  value,
  placeholder,
}) => (
  <div>
    {label &&
      <label
        className={style.label}
        htmlFor={name}
      >
        {label}
      </label>
    }
    <Flexbox className={style.field}>
      <Button
        icon={
          <IconRemove
            height={12}
            width={12}
          />
        }
        onClick={() => onChange((Number(value) - 1))}
        size="tiny"
      />
      <Input
        error={error}
        name={name}
        onBlur={onBlur}
        onChange={({ target }) => onChange(target.value)}
        placeholder={placeholder}
        size="tiny"
        type="text"
        value={handleValue(value)}
      />
      <Button
        icon={
          <IconAdd
            height={12}
            width={12}
          />
        }
        onClick={() => onChange((Number(value) + 1))}
        size="tiny"
      />
    </Flexbox>
    {error &&
      <p className={style.errorText}>{error}</p>
    }
  </div>
)

QuantityInput.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

QuantityInput.defaultProps = {
  error: null,
  label: null,
  onBlur: null,
  onChange: null,
  placeholder: null,
  value: null,
}

export default QuantityInput

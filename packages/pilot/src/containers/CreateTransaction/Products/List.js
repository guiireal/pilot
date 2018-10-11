import React from 'react'
import PropTypes from 'prop-types'
import {
  complement,
  isEmpty,
  pipe,
  prop,
  unless,
  both,
  is,
  always,
  unapply,
  map,
  sum,
} from 'ramda'
import {
  Button,
  Flexbox,
  Spacing,
  Table,
  CardContent,
} from 'former-kit'
import IconTrash from 'emblematic-icons/svg/Trash24.svg'

import { Message } from '../../../components/Message'
import ErrorIcon from './ErrorIcon.svg'

import currencyFormatter from '../../../formatters/currency'
import style from './style.css'

const getNumber = unless(
  both(is(Number), complement(Number.isNaN)),
  always(0)
)

const sumParameters = unapply(pipe(map(getNumber), sum))

const getColumns = (t, remove) => ([
  {
    accessor: ['title'],
    aggregationTitle: t('add_transaction_products_totals'),
    orderable: false,
    title: t('add_transaction_products_description'),
  },
  {
    accessor: ['id'],
    orderable: false,
    title: t('add_transaction_products_id'),
  },
  {
    accessor: ['quantity'],
    orderable: false,
    title: t('add_transaction_products_quantity'),
    renderer: item => (
      <Flexbox
        alignItems="center"
        justifyContent="center"
      >
        {item.quantity}
        <Spacing size="small" />
        <Button
          fill="outline"
          icon={
            <IconTrash
              height={12}
              width={12}
            />
          }
          onClick={() => remove(item.id)}
          size="tiny"
        />
      </Flexbox>
    ),
  },
  {
    accessor: ['unitPrice'],
    align: 'end',
    orderable: false,
    title: t('add_transaction_products_unit_value'),
    renderer: pipe(prop('unitPrice'), currencyFormatter),
  },
  {
    accessor: ['total'],
    align: 'end',
    orderable: false,
    title: t('add_transaction_products_subtotal'),
    renderer: pipe(prop('total'), currencyFormatter),
    aggregator: sumParameters,
    aggregationRenderer: currencyFormatter,
  },
])

const hasProducts = complement(isEmpty)

const ProductsList = ({
  onRemoveProduct,
  products,
  t,
}) => {
  if (hasProducts(products)) {
    return (
      <CardContent>
        <Table
          columns={getColumns(t, onRemoveProduct)}
          rows={products}
          // this props is necessary because the Table component has a bug
          // with aggregator.
          maxColumns={5}
          showAggregationRow
        />
      </CardContent>
    )
  }

  return (
    <div className={style.emptyState}>
      <Message
        image={<ErrorIcon />}
        message={
          <span>
            {t('add_transaction_products_no_products')}
          </span>
        }
      />
    </div>
  )
}

ProductsList.propTypes = {
  onRemoveProduct: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired),
  t: PropTypes.func.isRequired,
}

ProductsList.defaultProps = {
  products: [],
}

export default ProductsList

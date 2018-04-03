import React from 'react'
import {
  arrayOf,
  string,
  shape,
  bool,
  func,
  instanceOf,
  object,
  number,
} from 'prop-types'
import moment from 'moment'
import IconBalance from 'emblematic-icons/svg/Balance32.svg'
import IconChartsBars from 'emblematic-icons/svg/ChartBars32.svg'
import IconTransactions from 'emblematic-icons/svg/Transaction32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import {
  Alert,
  Grid,
  Row,
  Col,
  Card,
  CardContent,
  CardTitle,
  CardSection,
  CardSectionTitle,
} from 'former-kit'

import style from './style.css'

import Filter from '../Filter'
import Charts from './Charts'
import Table from './Table'

import formatCurrency from '../../formatters/currency'
import formatDate from '../../formatters/longDate'

const renderDateSelected = ({ start, end }) => {
  if (moment(start).isSame(end)) {
    return 'Hoje'
  }

  if (!start && !end) {
    return 'todo o período'
  }

  return `${formatDate(start)} até ${formatDate(end)}`
}

const renderTableSubtitle = count => (
  <div className={style.tableButtons}>
    <span>total de {count} transações</span>
  </div>
)

const TransactionsList = ({
  amount,
  clearFiltersLabel,
  collapsed,
  columns,
  count,
  data,
  dateSelectorPresets,
  dates,
  filterConfirmLabel,
  filterOptions,
  filtersTitle,
  findByLabel,
  graphicTittle,
  handleChartsCollapse,
  handleFilterChange,
  handleOrderChange,
  handlePageChange,
  handlePageCountChange,
  itemsPerPageLabel,
  loading,
  noContentFoundMessage,
  ofLabel,
  order,
  orderColumn,
  pagination,
  periodSummaryLabel,
  rows,
  search,
  selectedPage,
  tableTitle,
  totalVolumeLabel,
  transactionsNumberLabel,
  tryFilterAgainMessage,
  values,
  expandedRows,
  selectedRows,
  handleExpandRow,
  handleSelectRow,
}) => (
  <Grid>
    <Row>
      <Col
        palm={12}
        tablet={12}
        desk={12}
        tv={12}
      >
        <Filter
          dates={dates}
          values={values}
          search={search}
          options={filterOptions}
          datePresets={dateSelectorPresets}
          onChange={handleFilterChange}
          disabled={loading}
          title={filtersTitle}
          findByLabel={findByLabel}
          clearLabel={clearFiltersLabel}
          confirmLabel={filterConfirmLabel}
        />
      </Col>
      <Col
        palm={12}
        tablet={12}
        desk={12}
        tv={12}
      >
        {
          rows.length > 0 &&
          <Card>
            <CardTitle
              title={
                <h2 className={style.customTitle}>
                  <IconTransactions width={16} height={16} />
                  {periodSummaryLabel} <strong>{renderDateSelected(dates)}</strong>
                </h2>
              }
              subtitle={
                <h3 className={style.customTitle}>
                  <IconChartsBars width={16} height={16} />
                  {transactionsNumberLabel} <strong>{count}</strong>
                  <div className={style.verticalDivider} />
                  <IconBalance width={16} height={16} />
                  {totalVolumeLabel} <strong>{formatCurrency(amount)}</strong>
                </h3>
              }
            />

            <CardContent>
              <CardSection>
                <CardSectionTitle
                  title={graphicTittle}
                  collapsed={collapsed}
                  onClick={handleChartsCollapse}
                />
                {!collapsed &&
                  <CardContent>
                    <Charts data={data} />
                  </CardContent>
                }
              </CardSection>
            </CardContent>

            <CardContent>
              <CardSection>
                <CardSectionTitle
                  title={tableTitle}
                  subtitle={renderTableSubtitle(count, loading)}
                />
                <Table
                  expandable
                  selectable
                  maxColumns={7}
                  rows={rows}
                  columns={columns}
                  order={order}
                  orderColumn={orderColumn}
                  pagination={pagination}
                  handleOrderChange={handleOrderChange}
                  handlePageChange={handlePageChange}
                  handlePageCountChange={handlePageCountChange}
                  loading={loading}
                  selectedPage={selectedPage}
                  itemsPerPageLabel={itemsPerPageLabel}
                  ofLabel={ofLabel}
                  expandedRows={expandedRows}
                  selectedRows={selectedRows}
                  handleExpandRow={handleExpandRow}
                  handleSelectRow={handleSelectRow}
                />
              </CardSection>
            </CardContent>
          </Card>
        }
        {
          rows.length <= 0 &&
          !loading &&
          <div className={style.noResultAlert}>
            <Alert
              type="info"
              icon={<IconInfo height={16} width={16} />}
            >
              <p>
                <strong>{noContentFoundMessage}</strong>
                {tryFilterAgainMessage}
              </p>
            </Alert>
          </div>
        }
      </Col>
    </Row>
  </Grid>
)

TransactionsList.propTypes = {
  count: number,
  amount: number,
  pagination: shape({
    offset: number,
    total: number,
  }).isRequired,
  filterOptions: arrayOf(shape({
    key: string,
    name: string,
    items: arrayOf(shape({
      label: string,
      value: string,
    })),
  })).isRequired,
  dateSelectorPresets: arrayOf(shape({
    key: string,
    title: string,
    date: string,
    items: arrayOf(shape({
      title: string,
      date: func,
    })),
  })).isRequired,
  values: object, // eslint-disable-line
  search: string,
  selectedPage: number,
  dates: shape({
    start: instanceOf(moment),
    end: instanceOf(moment),
  }),
  order: string,
  orderColumn: number,
  loading: bool.isRequired, // eslint-disable-line react/no-typos
  columns: arrayOf(object),
  rows: arrayOf(object).isRequired, // eslint-disabled-line react/no-typos
  collapsed: bool.isRequired, // eslint-disable-line react/no-typos
  handleChartsCollapse: func.isRequired, // eslint-disable-line react/no-typos
  handleFilterChange: func.isRequired, // eslint-disable-line react/no-typos
  handleOrderChange: func.isRequired, // eslint-disable-line react/no-typos
  handlePageChange: func.isRequired, // eslint-disable-line react/no-typos
  handlePageCountChange: func.isRequired, // eslint-disable-line react/no-typos
  data: arrayOf(object), // eslint-disable-line

  graphicTittle: string.isRequired, // eslint-disable-line react/no-typos
  tableTitle: string.isRequired, // eslint-disable-line react/no-typos
  periodSummaryLabel: string.isRequired, // eslint-disable-line react/no-typos
  transactionsNumberLabel: string.isRequired, // eslint-disable-line react/no-typos
  totalVolumeLabel: string.isRequired, // eslint-disable-line react/no-typos
  itemsPerPageLabel: string.isRequired, // eslint-disable-line react/no-typos
  ofLabel: string.isRequired, // eslint-disable-line react/no-typos
  filtersTitle: string.isRequired, // eslint-disable-line react/no-typos
  findByLabel: string.isRequired, // eslint-disable-line react/no-typos
  clearFiltersLabel: string.isRequired, // eslint-disable-line react/no-typos
  filterConfirmLabel: string.isRequired, // eslint-disable-line react/no-typos
  noContentFoundMessage: string.isRequired, // eslint-disable-line react/no-typos
  tryFilterAgainMessage: string.isRequired, // eslint-disable-line react/no-typos
  expandedRows: arrayOf(number).isRequired,
  selectedRows: arrayOf(number).isRequired,
  handleSelectRow: func.isRequired, // eslint-disable-line react/no-typos
  handleExpandRow: func.isRequired, // eslint-disable-line react/no-typos
}

TransactionsList.defaultProps = {
  amount: 0,
  columns: [],
  count: 0,
  dates: {
    start: moment(),
    end: moment(),
  },
  order: 'descending',
  orderColumn: 0,
  search: '',
  selectedPage: 15,
  values: [],
}

export default TransactionsList
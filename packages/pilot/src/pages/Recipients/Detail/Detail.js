import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'former-kit'
import { translate } from 'react-i18next'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import moment from 'moment'
import mock from '../../../../src/containers/Balance/mock.json'

import DetailRecipient from '../../../../src/containers/RecipientDetails'

const mockBalance = {
  anticipation: {
    available: 10000,
    error: false,
    loading: false,
  },
  dates: {
    end: moment().add(1, 'month'),
    start: moment(),
  },
  ...mock.result,
  query: {
    dates: {
      end: moment().add(1, 'month'),
      start: moment(),
    },
    page: 1,
  },
  total: {
    net: 1000000,
    outcoming: 1000000,
    outgoing: 1000000,
  },
  currentPage: 1,
  disabled: false,
  onAnticipationClick: () => {},
  onCancel: () => {},
  onCancelRequestClick: () => {},
  onFilterClick: () => {},
  onPageChange: () => {},
  onSave: () => {},
  onWithdrawClick: () => {},
}

const mapStateToProps = (state) => {
  const { account } = state
  const { client } = account
  console.log('client', client.recipient)


  return {
    client,
  }
}

const enhanced = compose(
  connect(mapStateToProps),
  translate(),
  withRouter
)

class DetailRecipientPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
    }

    this.fetchAccounts = this.fetchAccounts.bind(this)
    this.handleRecipientData = this.handleRecipientData.bind(this)
    this.requestClient = this.requestClient.bind(this)
    this.onSaveAnticipation = this.onSaveAnticipation.bind(this)
    this.onSaveTransfer = this.onSaveTransfer.bind(this)
    this.onSaveBankAccount = this.onSaveBankAccount.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  componentWillMount () {
    this.handleRecipientData()
  }

  onSaveAnticipation (getData) {
    const { client } = this.props
    const { id } = this.props.match.params
    return client.recipient.update(id, { configuration: getData })
      .then(() => {
        this.setState({
          ...this.state,
          recipientData: {
            ...this.state.recipientData,
            configurationData: {
              ...this.state.recipientData.configurationData,
              anticipation: {
                ...this.state.recipientData.configurationData.anticipation,
                ...getData,
              },
            },
          },
        })
      })
  }

  onSaveTransfer (getData) {
    const { client } = this.props
    const { id } = this.props.match.params

    return client.recipient.update(id, { configuration: getData })
      .then(() => {
        this.setState({
          ...this.state,
          recipientData: {
            ...this.state.recipientData,
            configurationData: {
              ...this.state.recipientData.configurationData,
              transfer: {
                ...this.state.recipientData.configurationData.transfer,
                ...getData,
              },
            },
          },
        })
      })
  }

  onSaveBankAccount (getData) {
    const { client } = this.props
    const { id } = this.props.match.params
    let operation
    if (getData.id) {
      operation = client.recipient.update(id, { configuration: getData })
    } else if (getData.bank) {
      const { documentType } = this.state.recipientData.informationData.identification
      operation = client.recipient.createNewAccount({
        identification: {
          documentType,
          [documentType]: this.state.recipientData.informationData.identification[documentType],
        },
        bankAccount: getData,
      })
    }
    return operation
      .then((data) => {
        console.log('dataSinixxxxtro', data)
        const { accounts } = this.state.recipientData.configurationData
        console.log('varias contas', this.state.recipientData.configurationData)
        console.log('isso', [...accounts, data.bank_account])
        this.setState({
          ...this.state,
          recipientData: {
            ...this.state.recipientData,
            configurationData: {
              ...this.state.recipientData.configurationData,
              accounts: [...accounts, data.bank_account],
              bankAccount: {
                ...data.bank_account,
              },
            },
          },
        })
      })
  }

  onCancel () {
    this.setState({
      ...this.state,
    })
  }

  handleRecipientData () {
    this.setState({
      loading: true,
    }, () => {
      this.requestClient()
    })
  }

  fetchAccounts (document) {
    return this.props.client.recipient.bankAccount(document)
  }

  requestClient () {
    const { client } = this.props
    const { id } = this.props.match.params

    let recipient

    client.recipient.detail(id)
      .then((result) => {
        recipient = result
        const recipientIdentification = recipient.informationData.identification
        return this.fetchAccounts(recipientIdentification)
      })
      .then((accounts) => {
        this.setState({
          ...this.state,
          recipientData: {
            ...recipient,
            configurationData: {
              ...recipient.configurationData,
              ...accounts,
            },
          },
          loading: false,
        })
      })
      .catch((error) => {
        this.setState({
          error,
          loading: false,
        })
      })
  }

  render () {
    if (this.state.recipientData) {
      return (
        <Card>
          <DetailRecipient
            informationProps={this.state.recipientData.informationData}
            balanceProps={mockBalance}
            configurationProps={{
              ...this.state.recipientData.configurationData,
              onSaveAnticipation: this.onSaveAnticipation,
              onSaveTransfer: this.onSaveTransfer,
              onSaveBankAccount: this.onSaveBankAccount,
              onCancel: this.onCancel,
            }}
            recipient={this.state.recipientData.companyData}
            t={this.props.t}
          />
        </Card>
      )
    }
    return null
  }
}

DetailRecipientPage.propTypes = {
  client: PropTypes.shape({
    recipient: PropTypes.shape({
      add: PropTypes.func.isRequired,
      bankAccount: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(DetailRecipientPage)
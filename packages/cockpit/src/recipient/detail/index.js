import format from './format'
import {
  formatToAnticipation,
  formatToTransfer,
  formatToBankAccount,
} from '../add/formatToRecipient'

const DetailRecipient = client => recipientId => (
  client.recipients.find({ id: recipientId })
    .then(recipient => (format(recipient)))
)

const UpdateDetailRecipient = client => (recipientId, getData) => {
  const anticipationFormat = formatToAnticipation(getData)
  const transferFormat = formatToTransfer(getData)
  const bankAccountFormat = formatToBankAccount(getData)
  // if (getData.configuration.anticipationModel) {
  //   return client.recipients.update({
  //     id: recipientId,
  //     ...anticipationFormat,
  //   })
  // }
  // if (getData.configuration.transferInterval) {
  //   return client.recipients.update({
  //     id: recipientId,
  //     ...transferFormat,
  //   })
  // }
  // if (getData.configuration.id) {
  //   return client.recipients.update({
  //     id: recipientId,
  //     ...bankAccountFormat,
  //   })
  // }
  return client.recipients.update({
    id: recipientId,
    ...anticipationFormat,
    ...transferFormat,
    ...bankAccountFormat,
  })
  // return null
}

const AddNewBankAccount = client => (data) => {
  const newAccount = formatToBankAccount(data)
  return client.bankAccounts.create(newAccount.bank_account)
}

export default {
  detail: DetailRecipient,
  update: UpdateDetailRecipient,
  createNewAccount: AddNewBankAccount,
}

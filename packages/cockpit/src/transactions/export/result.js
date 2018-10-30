import {
  applySpec,
  concat,
  head,
  keys,
  map,
  path,
  pick,
  pipe,
  prop,
  uniq,
  values,
} from 'ramda'

import transactionSpec from '../shared/export'

const headers = [
  'Status',
  'ID',
  'Data',
  'Nome',
  'Forma de Pagamento',
  'Número do Cartão',
  'Documento',
  'Email',
  'ID da Assinatura',
  'Telefone',
  'Operadora de Cartão',
  'Resposta da Operadora',
  'IP',
  'Bandeira do Cartão',
  'Valor',
  'Valor Capturado',
  'Valor Estornado',
  'Recebedores',
  'Endereço',
  'Número do Endereço',
  'Complemento',
  'Bairro',
  'CEP',
  'Cidade',
  'Estado',
  'Nível de Risco',
  'Antifraude',
]

const getHeaderValidProps = pipe(
  head,
  prop('_source'),
  pick(headers)
)

const exportKeys = pipe(
  getHeaderValidProps,
  keys,
  concat(headers),
  uniq
)

const exportKeysCSV = exportData => exportKeys(exportData).join(',')

const format = exportType => (exportData) => {
  if (exportType === 'csv') {
    return values(exportData).join(',')
  }

  return values(exportData)
}

const mapSourceToData = applySpec(transactionSpec)

const formatLines = exportType => map(pipe(
  prop('_source'),
  mapSourceToData,
  format(exportType)
))

const buildData = exportType => (exportData) => {
  if (exportType === 'csv') {
    const header = exportKeysCSV(exportData)
    const lines = formatLines(exportType)
    return [header].concat(lines(exportData)).join('\r\n')
  }

  const header = exportKeys(exportData)
  const lines = formatLines(exportType)
  return [header].concat(lines(exportData))
}

const buildResult = exportType => pipe(
  path(['hits', 'hits']),
  buildData(exportType)
)

export default buildResult

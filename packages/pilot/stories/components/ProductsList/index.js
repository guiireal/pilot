import React from 'react'

import Section from '../../Section'
import List from './List'

const products = [
  {
    id: '1',
    title: 'Kit Camiseta',
    unitPrice: 12000,
    quantity: 1,
    total: 12000,
  },
  {
    id: '2',
    title: 'Coleção as Crônicas de Narnia',
    unitPrice: 20000,
    quantity: 2,
    total: 40000,
  },
]

export const WithProducts = () => (
  <Section>
    <List products={products} />
  </Section>
)

export const EmptyList = () => (
  <Section>
    <List products={[]} />
  </Section>
)

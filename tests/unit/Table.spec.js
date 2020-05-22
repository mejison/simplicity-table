import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { SimplicityTable } from '@/components'

import orders from '@/orders.json'

const columns = [
  {
    field: 'order_id',
    label: 'ID',
  },
  {
    field: 'target_platform.platform_name',
    label: 'Platform Name',
  },
  {
    field: 'total_amount',
    label: 'Total Amount',
  },
  {
    field: 'currency.ISO3',
    label: 'Currency',
  },
  {
    field: 'order_status.status_description',
    label: 'Status',
  },
  {
    field: 'shipping_details.shipment_type',
    label: 'Shipping Details'
  },
  {
    field: 'purchased_at',
    label: 'Purchased At',
  }
]


describe('SimplicityTable.vue', () => {
  it('test renders table without parameters', () => {
    const wrapper = shallowMount(SimplicityTable)
    expect(wrapper.text()).to.include('Nothing here.')
  })

  it('test renders table with parameters', () => {
    const wrapper = shallowMount(SimplicityTable, {
      propsData: {
        columns: columns,
        data: orders
      }
    })
    expect(wrapper.text()).to.not.include('Nothing here.')
  })

  it('test renders table with parameters', () => {
    const wrapper = shallowMount(SimplicityTable, {
      propsData: {
        columns: columns,
        data: orders
      }
    })
    expect(wrapper.text()).to.not.include('Nothing here.')
  })
})

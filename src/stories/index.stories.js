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

const columnsSorting = [
  {
    field: 'order_id',
    label: 'ID',
    sorted: true,
  },
  {
    field: 'target_platform.platform_name',
    label: 'Platform Name',
    sorted: true,
  },
  {
    field: 'total_amount',
    label: 'Total Amount',
    sorted: true,
  },
  {
    field: 'currency.ISO3',
    label: 'Currency',
    sorted: true,
  },
  {
    field: 'order_status.status_description',
    label: 'Status',
    sorted: true,
  },
  {
    field: 'shipping_details.shipment_type',
    label: 'Shipping Details',
    sorted: true,
  },
  {
    field: 'purchased_at',
    label: 'Purchased At',
    sorted: true,
  }
]

const columnsEditable = [
  {
    field: 'order_id',
    label: 'ID',
    sorted: true,
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
    field: 'shipping_details.source_order_id',
    label: 'Source Order Id',
    editable: true,
  },
  {
    field: 'shipping_details.source_order_tracking_id',
    label: 'Source Order Tracking Id',
    editable: true,
  },
  {
    field: 'shipping_details.source_order_carrier',
    label: 'Source Order Carrier',
    editable: true,
  },
  {
    field: 'purchased_at',
    label: 'Purchased At',
  }
]

export default {
  component: SimplicityTable,
  title: 'Simplicity Table',
}

export const Table = () => ({
  components: { SimplicityTable },
  template: `<simplicity-table 
                :columns='${JSON.stringify(columns)}' 
                :data='${JSON.stringify(orders)}' 
              />`,
})

export const TableStriped = () => ({
  components: { SimplicityTable },
  template: `<simplicity-table 
                :columns='${JSON.stringify(columns)}' 
                :data='${JSON.stringify(orders)}' 
                :striped="true"
              />`,
})

export const TableBordered = () => ({
  components: { SimplicityTable },
  template: `<simplicity-table 
                :columns='${JSON.stringify(columns)}' 
                :data='${JSON.stringify(orders)}' 
                :bordered="true"
              />`,
})

export const TableWithoutPagination = () => ({
  components: { SimplicityTable },
  template: `<simplicity-table 
                :columns='${JSON.stringify(columns)}' 
                :data='${JSON.stringify(orders)}'
                :is-paginated="false"
              />`,
})

export const TableWithActions = () => ({
  components: { SimplicityTable },
  template: `<simplicity-table 
                :columns='${JSON.stringify(columns)}' 
                :data='${JSON.stringify(orders)}' 
                :is-actions="true"
                identity="order_id"
              />`,
})

export const TableWithSorting = () => ({
  components: { SimplicityTable },
  template: `<simplicity-table 
                :columns='${JSON.stringify(columnsSorting)}' 
                :data='${JSON.stringify(orders)}'
              />`,
})

export const TableWithEditable = () => ({
  components: { SimplicityTable },
  template: `<simplicity-table 
                :columns='${JSON.stringify(columnsEditable)}' 
                :data='${JSON.stringify(orders)}'
              />`,
})
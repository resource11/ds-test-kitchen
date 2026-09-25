import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';

const meta = {
  title: 'Components/Layout/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean' },
    hideCaption: { control: 'boolean' },
    caption: { control: 'text' },
  },
  args: { striped: false, hideCaption: false, caption: 'Invoices issued in the last quarter' },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { ref: 'INV-2041', client: 'Northwind Trading', issued: '2025-04-02', status: 'Paid', total: '1,240.00' },
  { ref: 'INV-2042', client: 'Ardent Labs', issued: '2025-04-11', status: 'Paid', total: '3,980.50' },
  { ref: 'INV-2043', client: 'Kestrel Media', issued: '2025-04-19', status: 'Sent', total: '740.00' },
  { ref: 'INV-2044', client: 'Halden & Co', issued: '2025-05-03', status: 'Overdue', total: '2,115.75' },
  { ref: 'INV-2045', client: 'Petra Studio', issued: '2025-05-16', status: 'Sent', total: '560.00' },
  { ref: 'INV-2046', client: 'Vantage Freight', issued: '2025-05-28', status: 'Draft', total: '8,300.00' },
];

const renderTable = (args: React.ComponentProps<typeof Table.Root>) => (
  <Table.Root {...args}>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Reference</Table.HeaderCell>
        <Table.HeaderCell>Client</Table.HeaderCell>
        <Table.HeaderCell>Issued</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell numeric>Total (EUR)</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {invoices.map((invoice) => (
        <Table.Row key={invoice.ref}>
          <Table.HeaderCell scope="row">{invoice.ref}</Table.HeaderCell>
          <Table.Cell>{invoice.client}</Table.Cell>
          <Table.Cell>{invoice.issued}</Table.Cell>
          <Table.Cell>{invoice.status}</Table.Cell>
          <Table.Cell numeric>{invoice.total}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
);

export const Default: Story = { render: renderTable };

/**
 * `numeric` belongs on the header as well as the cells. Without it the amount
 * column reads as a left-aligned label sitting over right-aligned figures; the
 * two tables below are the same data with and without it.
 */
export const NumericColumn: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sds-space-5)' }}>
      <Table.Root caption="With numeric on the header: label and figures share an edge">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Reference</Table.HeaderCell>
            <Table.HeaderCell>Client</Table.HeaderCell>
            <Table.HeaderCell numeric>Total (EUR)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {invoices.slice(0, 3).map((invoice) => (
            <Table.Row key={invoice.ref}>
              <Table.HeaderCell scope="row">{invoice.ref}</Table.HeaderCell>
              <Table.Cell>{invoice.client}</Table.Cell>
              <Table.Cell numeric>{invoice.total}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Table.Root caption="Without it: the header drifts away from its own column">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Reference</Table.HeaderCell>
            <Table.HeaderCell>Client</Table.HeaderCell>
            <Table.HeaderCell>Total (EUR)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {invoices.slice(0, 3).map((invoice) => (
            <Table.Row key={invoice.ref}>
              <Table.HeaderCell scope="row">{invoice.ref}</Table.HeaderCell>
              <Table.Cell>{invoice.client}</Table.Cell>
              <Table.Cell numeric>{invoice.total}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
};

export const Striped: Story = { args: { striped: true }, render: renderTable };

/** The caption stays in the accessibility tree even when it is not drawn. */
export const HiddenCaption: Story = {
  args: { hideCaption: true, caption: 'Invoices issued in the last quarter' },
  render: renderTable,
};

/** No caption at all: allowed, but the table then has no accessible name. */
export const WithoutCaption: Story = {
  args: { caption: undefined },
  render: renderTable,
};

/** Many columns in a narrow space: the container scrolls, the page does not. */
export const Overflowing: Story = {
  args: { striped: true, caption: 'Line items, more columns than space' },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Table.Root {...args}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Reference</Table.HeaderCell>
            <Table.HeaderCell>Client</Table.HeaderCell>
            <Table.HeaderCell>Issued</Table.HeaderCell>
            <Table.HeaderCell>Due</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell numeric>Net</Table.HeaderCell>
            <Table.HeaderCell numeric>VAT</Table.HeaderCell>
            <Table.HeaderCell numeric>Total (EUR)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {invoices.map((invoice) => (
            <Table.Row key={invoice.ref}>
              <Table.HeaderCell scope="row">{invoice.ref}</Table.HeaderCell>
              <Table.Cell>{invoice.client}</Table.Cell>
              <Table.Cell>{invoice.issued}</Table.Cell>
              <Table.Cell>30 days</Table.Cell>
              <Table.Cell>{invoice.status}</Table.Cell>
              <Table.Cell numeric>{invoice.total}</Table.Cell>
              <Table.Cell numeric>21%</Table.Cell>
              <Table.Cell numeric>{invoice.total}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
};

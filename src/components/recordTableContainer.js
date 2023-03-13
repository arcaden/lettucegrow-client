import {
  TextField,
  IndexTable,
  LegacyCard,
  Filters,
  Select,
  useIndexResourceState,
  Text,
} from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import CreateRecordForm from './createRecordForm';

export default function RecordTableContainer() {
  const navigate = useNavigate();

  useEffect(() => {  
    console.log(localStorage.getItem("token"))      
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    }
  });



  const customers = [
    {
      id: '3417',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2567',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
    },
  ];
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const records = [
    {
      "id": "845e69fc-6e13-4524-99c6-3fb0fbbc509e",
      "garden_id": "7b50c976-2528-4af1-bb32-f8d2ae6a9f9a",
      "pod_id": "23c86dce-2bb0-4f01-9659-fe6cca3cbe3e",
      "user": {
        "name": "Tester A"
      },
      "water": true,
      "start_ec": "800.0",
      "end_ec": "1000.0",
      "start_ph": "7.0",
      "end_ph": "7.1",
      "temperature": "26.0",
      "ph_up": "100.0",
      "ph_down": "0.0",
      "photos": [],
      "created_at": "2023-03-05T23:47:07.934Z"
    },
    {
      "id": "eb53ad40-269d-4de1-adfc-58c538683c2a",
      "garden_id": "7b50c976-2528-4af1-bb32-f8d2ae6a9f9a",
      "pod_id": "23c86dce-2bb0-4f01-9659-fe6cca3cbe3e",
      "user": {
        "name": "Tester A"
      },
      "water": false,
      "start_ec": "1000.0",
      "end_ec": "1200.0",
      "start_ph": "7.1",
      "end_ph": "7.5",
      "temperature": "26.0",
      "ph_up": "200.0",
      "ph_down": "0.0",
      "photos": [],
      "created_at": "2023-03-05T23:47:07.942Z"
    },
    {
      "id": "e988cc7a-ea5f-4925-8ce6-f68db0d99fb2",
      "garden_id": "7b50c976-2528-4af1-bb32-f8d2ae6a9f9a",
      "pod_id": "23c86dce-2bb0-4f01-9659-fe6cca3cbe3e",
      "user": {
        "name": "Tester A"
      },
      "water": true,
      "start_ec": "1000.0",
      "end_ec": "1100.0",
      "start_ph": "7.0",
      "end_ph": "8.0",
      "temperature": null,
      "ph_up": "100.0",
      "ph_down": "0.0",
      "photos": [],
      "created_at": "2023-03-07T22:20:39.678Z"
    },
    {
      "id": "b05c065c-40c0-4584-94a8-0d66c85e6ba2",
      "garden_id": "7b50c976-2528-4af1-bb32-f8d2ae6a9f9a",
      "pod_id": "23c86dce-2bb0-4f01-9659-fe6cca3cbe3e",
      "user": {
        "name": "Tester A"
      },
      "water": true,
      "start_ec": "1000.0",
      "end_ec": "1100.0",
      "start_ph": "7.0",
      "end_ph": "8.0",
      "temperature": null,
      "ph_up": "100.0",
      "ph_down": "0.0",
      "photos": [],
      "created_at": "2023-03-07T22:21:30.421Z"
    },
    {
      "id": "89af525a-ebc5-48f6-a9cb-24fa3b172b60",
      "garden_id": "7b50c976-2528-4af1-bb32-f8d2ae6a9f9a",
      "pod_id": "23c86dce-2bb0-4f01-9659-fe6cca3cbe3e",
      "user": {
        "name": "Tester A"
      },
      "water": true,
      "start_ec": "1000.0",
      "end_ec": "1100.0",
      "start_ph": "7.0",
      "end_ph": "8.0",
      "temperature": null,
      "ph_up": "100.0",
      "ph_down": "0.0",
      "photos": [],
      "created_at": "2023-03-07T22:21:40.967Z"
    }
  ]



  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customers);
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState('today');

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback((value) => setSortValue(value), []);

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];
  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  const filters = [
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
      {
        key: 'taggedWith',
        label: disambiguateLabel('taggedWith', taggedWith),
        onRemove: handleTaggedWithRemove,
      },
    ]
    : [];

  const sortOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'lastWeek' },
  ];

  const rowMarkup = records.map(
    ({id, user, created_at, start_ec, end_ec, start_ph, end_ph, temperature, ph_up, ph_down, water }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text fontWeight="bold" as="span">
            {user.name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span"  numeric>
            {created_at}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span"  numeric>
            {start_ph}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span"  numeric>
            {end_ph}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span"  numeric>
            {ph_up}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span"  numeric>
            {ph_down}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span"  numeric>
            {start_ec}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span"  numeric>
            {end_ec}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span"  numeric>
            {water}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span"  numeric>
            {temperature}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span"  numeric>
            Buttons
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <div style={{ padding: '16px', display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={setQueryValue}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
          />
        </div>
        <div style={{ paddingLeft: '0.25rem' }}>
          <Select
            labelInline
            label="Sort by"
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
          />
        </div>
        <div style={{ paddingLeft: '0.25rem' }}>
          <CreateRecordForm></CreateRecordForm>
        </div>
      </div>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        hasMoreItems
        bulkActions={bulkActions}
        promotedBulkActions={promotedBulkActions}
        lastColumnSticky
        headings={[
          { title: 'Name' },
          { title: 'Date' },
          { title: 'Start pH' },
          { title: 'End pH' },
          { title: 'pH Up (mL)' },
          { title: 'pH Down (mL)' },
          { title: 'Start PPM' },
          { title: 'End PPM' },
          { title: 'H2O' },
          { title: 'Temperature' },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith':
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}
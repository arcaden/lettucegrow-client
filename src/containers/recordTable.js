import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecords, createRecord, updateRecordById, deleteRecordById } from '../services/recordsSlice';

const RecordTable = () => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records);

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  const handleAddRecord = () => {
    const name = prompt('Enter a name for the new record:');
    if (name) {
      dispatch(createRecord(name));
    }
  };

  const handleUpdateRecord = (id) => {
    const name = prompt('Enter a new name for the record:');
    if (name) {
      dispatch(updateRecordById(id, name));
    }
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteRecordById(id));
    }
  };

  function tableBody(records) {
    if (records) {
    records.map((record) => (
      <tr key={record.id}>
        <td>{record.id}</td>
        <td>{record.id}</td>
        <td>
          <button onClick={() => handleUpdateRecord(record.id)}>Update</button>
          <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
        </td>
      </tr>
    ))} else {
      <b> Testing </b>
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>pH</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>
            <button onClick={handleAddRecord}>Add Record</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default RecordTable;
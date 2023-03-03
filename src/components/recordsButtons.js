import React from 'react';
import { useDispatch } from 'react-redux';
import { getRecords, createRecord, updateRecordById, deleteRecordById } from '../services/recordsSlice';

const RecordList = () => {
  const dispatch = useDispatch();

  const handleGetRecords = () => {
    dispatch(getRecords());
  };

  const handleCreateRecord = () => {
    dispatch(createRecord('New Record'));
  };

  const handleUpdateRecord = () => {
    dispatch(updateRecordById(1, 'Updated Record'));
  };

  const handleDeleteRecord = () => {
    dispatch(deleteRecordById(1));
  };

  return (
    <div>
      <button onClick={handleGetRecords}>Get Records</button>
      <button onClick={handleCreateRecord}>Create Record</button>
      <button onClick={handleUpdateRecord}>Update Record</button>
      <button onClick={handleDeleteRecord}>Delete Record</button>
    </div>
  );
};

export default RecordList;
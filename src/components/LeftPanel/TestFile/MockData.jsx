import React from 'react';
import MockDataFieldKey from './MockDataKey';
import {
  deleteMockData,
  addMockDataKey,
  updateMockDataName,
} from '../../../context/mockDataActions';
const plusIcon = require('../../../assets/images/13 copy.png');
const minusIcon = require('../../../assets/images/14 copy.png');

const MockData = ({ mockDatumId, dispatchMockData, fieldKeys }) => {
  const handleClickAdd = (e, id) => {
    e.stopPropagation();
    dispatchMockData(addMockDataKey(id));
  };

  const handleClickDelete = e => {
    e.stopPropagation();
    dispatchMockData(deleteMockData(mockDatumId));
  };

  const handleClickUpdate = e => {
    e.stopPropagation();
    dispatchMockData(updateMockDataName(mockDatumId, e.target.value));
  };

  const keys = {
    padding: '5px',
  };
  const mockDataFieldKeys = fieldKeys.map(key => (
    <MockDataFieldKey
      key={key.id}
      dispatchMockData={dispatchMockData}
      mockDatumId={mockDatumId}
      mockDatumKeyId={key.id}
      fieldKey={key.fieldKey}
      fieldType={key.fieldType}
    />
  ));

  return (
    <div>
      <img src={minusIcon} onClick={handleClickDelete} style={keys} />
      <label htmlFor='mock-data-name'>Name </label>
      <input type='text' id='mock-data-name' onChange={handleClickUpdate} />
      <div style={keys}>
        <label htmlFor='mock-data-key'>Add filed keys </label>
        <label htmlFor='mock-data-type'>Type </label>
      </div>
      {mockDataFieldKeys}
      <button onClick={e => handleClickAdd(e, mockDatumId)}>
        <img src={plusIcon} />
        Add Key
      </button>
    </div>
  );
};

export default MockData;
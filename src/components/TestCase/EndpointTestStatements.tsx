import React, { useContext } from 'react';
import Endpoint from '../EndpointTestComponent/Endpoint';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import { EndpointStatements } from '../../utils/endpointTypes';

const EndpointTestStatements = () => {
  const [{ endpointStatements }, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);
  return (
    <>
      {endpointStatements.map((statement: EndpointStatements, i: number) => {
        switch (statement.type) {
          /* add statements here. Ex: */
          case 'endpoint':
            return <Endpoint key={statement.id} endpoint={statement} index={i} />;
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default EndpointTestStatements;

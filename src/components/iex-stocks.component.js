import React from 'react';

const IEX = (props) => {
  return (
    <div className='row'>
      <table>
        <thead>
          <tr>
            <th scope='col'>Brought to you by IEX</th>
          </tr>
        </thead>
        <tbody>
          <tr id='high'>
            <th scope='row'>Daily High</th>
            <td>{props.dailyPrice.high}</td>
          </tr>
          <tr id='low'>
            <th scope='row'>Daily Low</th>
            <td>{props.dailyPrice.low}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IEX;

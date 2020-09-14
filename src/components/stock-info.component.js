import React from 'react';

// TODO: refactor key indicators out of other components into this one

const StockInfo = (props) => {
  return (
    <div className='StockContainer'>
      <div className='companyCard'>{`${props.company.name}`}</div>
      <div className='InfoContainer'>
        <div className='InfoPiece'>hello</div>
        <div className='InfoPiece'>hey</div>
        <div className='InfoPiece'>hey</div>
        <div className='InfoPiece'>hey</div>
        <div className='InfoPiece'>hey</div>
        <div className='InfoPiece'>hey</div>
      </div>
    </div>
  );
};

export default StockInfo;

import React from 'react';

// TODO: refactor key indicators out of other components into this one

const StockInfo = (props) => {
  return (
    <div className='StockContainer'>
      <div className='companyCard'>{`${props.company.name}`}</div>
      <div className='InfoContainer'>
        <div className='InfoPiece'>${`${props.dailyPrice.latestPrice}`}</div>
        {props.dailyPrice ? (
          <div className='InfoPiece'>{`${props.dailyPrice.change}`}%</div>
        ) : (
          <div className='InfoPiece'>Low</div>
        )}
        <div className='InfoPiece'>
          Bullish:{' '}
          {props.newsSentiment.sectorAverageBullishPercent > 0.5 ? 'Yes' : 'No'}
        </div>
        <div className='InfoPiece'>
          52wk High: {`${props.dailyPrice.week52High}`}
        </div>
        <div className='InfoPiece'>
          {' '}
          52wk Low: {`${props.dailyPrice.week52Low}`}
        </div>
        <div className='InfoPiece'>PE:{`${props.dailyPrice.peRatio}`}</div>
      </div>
    </div>
  );
};

export default StockInfo;

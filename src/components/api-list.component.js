import React from 'react';
import Finnhub from './finnhub-stocks.component';
import IEX from './iex-stocks.component';

const APIList = (props) => {
  return (
    <div>
      <div className='container'>
        <Finnhub
          newsSentiment={props.newsSentiment}
          finnhubNews={props.finnhubNews}
        />
        <IEX dailyPrice={props.dailyPrice} iexNews={props.iexNews} />
      </div>
    </div>
  );
};

export default APIList;

import React from 'react';

const IEX = (props) => {
  return (
    <div className='IEXContainer'>
      <h2>IEX</h2>
      <ul className='IEXList'>
        <li>Daily Prices</li>
        <li>High: {props.dailyPrice.high}</li>
        <li>Low: {props.dailyPrice.low}</li>
        <li>
          {!props.iexNews.summary ? 'No News' : props.iexNews.summary}
          {props.iexNews.headline ? (
            <a href={`${props.iexNews.url} `}>Read More</a>
          ) : (
            ''
          )}
        </li>
      </ul>
    </div>
  );
};

export default IEX;

import React from 'react';

let news = [];

const Finnhub = (props) => {
  return (
    <div className='FinnhubContainer'>
      <h2>Finnhub</h2>
      <ul className='FinnhubList'>
        <li>Company News Score</li>
        <li>{props.newsSentiment.companyNewsScore}</li>
        <li>
          {!props.finnhubNews.summary ? 'No News' : props.finnhubNews.summary}
          {props.finnhubNews.summary ? (
            <a href={`${props.finnhubNews.url} `}>Read More</a>
          ) : (
            ''
          )}
        </li>
        <li>
          Bullish:{' '}
          {props.newsSentiment.sectorAverageBullishPercent > 0.5 ? 'Yes' : 'No'}
        </li>
      </ul>
    </div>
  );
};

export default Finnhub;

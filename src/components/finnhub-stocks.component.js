import React from 'react';

const Finnhub = (props) => {
  return (
    <div className='FinnhubContainer'>
      <h2>Finnhub</h2>
      <ul className='FinnhubList'>
        <li>
          {!props.finnhubNews.summary ? 'No News' : props.finnhubNews.summary}
          {props.finnhubNews.summary ? (
            <a
              title='read the full article'
              target='_blank'
              rel='noopener noreferrer'
              href={`${props.finnhubNews.url} `}>
              Read More
            </a>
          ) : (
            ''
          )}
        </li>
      </ul>
    </div>
  );
};

export default Finnhub;

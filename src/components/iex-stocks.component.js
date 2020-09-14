import React from 'react';

const IEX = (props) => {
  return (
    <div className='IEXContainer'>
      <h2>IEX</h2>
      <ul className='IEXList'>
        <li>
          {!props.iexNews.headline ? 'No News' : props.iexNews.headline}
          {props.iexNews.headline ? (
            <a
              title='read the full article'
              target='_blank'
              rel='noopener noreferrer'
              href={`${props.iexNews.url} `}>
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

export default IEX;

import React from 'react';

const Finnhub = (props) => {
  return (
    <div className='FinnhubContainer'>
      <h2>Finnhub</h2>
      <ul>
        <li>Company News Score</li>
        <li>{props.news.companyNewsScore}</li>
        <li>{props.news.companyNewsScore}</li>
      </ul>
      <div>hi</div>
      <div>bye</div>
      <div className='row'>
        <table>
          <thead>
            <tr>
              <th scope='col'>Brought to you by Finnhub</th>
            </tr>
          </thead>
          <tbody>
            <tr id='news'>
              <th scope='row'>Company News Score</th>
              <td>{props.news.companyNewsScore}</td>
            </tr>
            <tr id='sentiment'>
              <th scope='row'>Bullish?</th>
              <td>
                {props.news.sectorAverageBullishPercent > 0.5 ? 'Yes' : 'No'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finnhub;

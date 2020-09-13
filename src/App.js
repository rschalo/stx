import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [hasError, setErrors] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [news, setNews] = useState({});
  const [company, setCompany] = useState({ name: 'Enter Company Name' });
  const [dailyPrice, setDailyPrice] = useState({ high: '--', low: '--' });
  const [recommendation, setRecommendation] = useState({});

  const iexAPIbase = 'https://cloud.iexapis.com/stable/stock/';
  const iexAPItail = '?token=pk_4318dcc6e34d4045b6554ab44800d38c';
  const iexAPIcalls = '/quote';

  const finnhubAPIbase = 'https://finnhub.io/api/v1/';
  const finnhubAPItail = '&token=bt9cf4748v6sbe2pt2pg';
  const finnhubAPIcalls = [
    'news-sentiment',
    'stock/profile2',
    'stock/recommendation',
  ];
  const finnhubAPIURIs = [];
  for (let i = 0; i < finnhubAPIcalls.length; i++) {
    finnhubAPIURIs.push(
      `${finnhubAPIbase}${finnhubAPIcalls[i]}?symbol=${symbol}${finnhubAPItail}`
    );
  }
  const handleClick = () => {
    let input = document.getElementById('symbolInput');
    input.select();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol === '') {
      alert('Please enter a valid ticker symbol');
    } else {
      try {
        Promise.all([
          axios.get(finnhubAPIURIs[0]),
          axios.get(finnhubAPIURIs[1]),
          axios.get(finnhubAPIURIs[2]),
        ]).then(([newsData, companyData, recData, priceData]) => {
          setNews(newsData.data);
          setCompany(companyData.data);
          setRecommendation(recData.data);
        });
        Promise.all([
          axios.get(`${iexAPIbase}${symbol}${iexAPIcalls}${iexAPItail}`),
        ]).then(([priceData]) => setDailyPrice(priceData.data));
      } catch (error) {
        console.log(error);
      }
      setSymbol('');
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='brand'>STX</div>
        <form className='stockInput' onSubmit={handleSubmit}>
          <input
            id='symbolInput'
            type='text'
            value={symbol}
            onClick={handleClick}
            onChange={(e) => setSymbol(e.target.value)}></input>
          <input type='submit' value='Get Stock Info'></input>
        </form>
      </header>
      <div className='container'>
        {!hasError ? null : <div>See error: {hasError}</div>}
        <div className='companyCard'>{`${company.name}`}</div>
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
                <td>{news.companyNewsScore}</td>
              </tr>
              <tr id='sentiment'>
                <th scope='row'>Bullish?</th>
                <td>{news.sectorAverageBullishPercent > 0.5 ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
                <td>{dailyPrice.high}</td>
              </tr>
              <tr id='low'>
                <th scope='row'>Daily Low</th>
                <td>{dailyPrice.low}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

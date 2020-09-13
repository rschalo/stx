import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Finnhub from './components/finnhub-stocks.component';
import IEX from './components/iex-stocks.component';
require('dotenv').config();

function App() {
  const [hasError, setErrors] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [news, setNews] = useState({});
  const [company, setCompany] = useState({ name: 'Enter Company Name' });
  const [dailyPrice, setDailyPrice] = useState({ high: '--', low: '--' });
  const [recommendation, setRecommendation] = useState({});

  const iexAPIbase = 'https://cloud.iexapis.com/stable/stock/';
  const iexAPItail = `?token=${process.env.REACT_APP_IEX_TOKEN}`;
  const iexAPIcalls = '/quote';

  const finnhubAPIbase = 'https://finnhub.io/api/v1/';
  const finnhubAPItail = `&token=${process.env.REACT_APP_FINNHUB_TOKEN}`;
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

  let date = new Date();
  const today = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  // TODO: check for end of month
  let yesterday = today.split('-');
  yesterday[2] = String(Number(yesterday[2]) + 1);
  yesterday = yesterday.join('-');

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
          <button type='submit' value='Get Stock Info'>
            Submit
          </button>
        </form>
      </header>
      <div className='container'>
        <div className='companyCard'>{`${company.name}`}</div>
      </div>
      <div className='container'>
        {!hasError ? null : <div>See error: {hasError}</div>}
        <Finnhub news={news} />
        <IEX dailyPrice={dailyPrice} />
      </div>
    </div>
  );
}

export default App;

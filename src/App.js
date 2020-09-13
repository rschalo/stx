import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import getIEX from './controllers/iex-controller';
import IEX from './components/iex-stocks.component';
import getFinnhub from './controllers/finnhub-controller';
import Finnhub from './components/finnhub-stocks.component';

require('dotenv').config();

function App() {
  const [hasError, setErrors] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [news, setNews] = useState({});
  const [company, setCompany] = useState({ name: 'Enter Company Name' });
  const [dailyPrice, setDailyPrice] = useState({ high: '--', low: '--' });
  const [recommendation, setRecommendation] = useState({});

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
        getFinnhub.then(([newsData, companyData, recData, priceData]) => {
          setNews(newsData.data);
          setCompany(companyData.data);
          setRecommendation(recData.data);
        });
        getIEX(symbol).then(([priceData]) => setDailyPrice(priceData.data));
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

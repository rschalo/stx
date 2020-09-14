import React, { useState } from 'react';
import './App.css';
import getIEX from './controllers/iex-controller';
import getFinnhub from './controllers/finnhub-controller';
import APIList from './components/api-list.component';
import StockInfo from './components/stock-info.component';

require('dotenv').config();

function App() {
  const [hasError, setErrors] = useState(false);
  const [symbol, setSymbol] = useState('Enter Company Ticker');
  const [newsSentiment, setNewsSentiment] = useState({});
  const [finnhubNews, setFinnhubNews] = useState({});
  const [company, setCompany] = useState({ name: 'Search Ticker Above' });
  const [dailyPrice, setDailyPrice] = useState({
    latestPrice: 'Last Price',
    change: '--',
    peRatio: '--',
    week52High: '--',
    week52Low: '--',
  });
  const [iexNews, setIexNews] = useState({});

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
        getFinnhub(symbol).then(
          ([newsSentimentData, companyData, recData, finnhubNewsData]) => {
            setNewsSentiment(newsSentimentData.data);
            setCompany(companyData.data);
            finnhubNewsData.data[0]
              ? setFinnhubNews(finnhubNewsData.data[0])
              : setFinnhubNews('No news');
          }
        );
        getIEX(symbol).then(([priceData, iexNewsData]) => {
          setDailyPrice(priceData.data);
          iexNewsData.data[0].lang !== 'en'
            ? setIexNews(iexNewsData.data[1])
            : setIexNews(iexNewsData.data[0]);
        });
      } catch (error) {
        setErrors(error);
        console.error(hasError);
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
      <StockInfo
        company={company}
        dailyPrice={dailyPrice}
        newsSentiment={newsSentiment}
      />
      <APIList
        finnhubNews={finnhubNews}
        iexNews={iexNews}
        newsSentiment={newsSentiment}
        dailyPrice={dailyPrice}
      />
    </div>
  );
}

export default App;

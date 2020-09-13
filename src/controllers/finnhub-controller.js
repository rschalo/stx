import axios from 'axios';

const finnhubAPIbase = 'https://finnhub.io/api/v1/';
const finnhubAPItail = `&token=${process.env.REACT_APP_FINNHUB_TOKEN}`;
const finnhubAPIcalls = [
  'news-sentiment',
  'stock/profile2',
  'stock/recommendation',
];
const finnhubAPIURIs = [];

let date = new Date();
const today = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0];

// TODO: check for end of month
let yesterday = today.split('-');
yesterday[2] = String(Number(yesterday[2]) + 1);
yesterday = yesterday.join('-');

const getFinnhub = (symbol) => {
  for (let i = 0; i < finnhubAPIcalls.length; i++) {
    finnhubAPIURIs.push(
      `${finnhubAPIbase}${finnhubAPIcalls[i]}?symbol=${symbol}${finnhubAPItail}`
    );
  }
  return Promise.all([
    axios.get(finnhubAPIURIs[0]),
    axios.get(finnhubAPIURIs[1]),
    axios.get(finnhubAPIURIs[2]),
  ]);
};

export default getFinnhub;

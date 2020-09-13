import axios from 'axios';

const iexAPIbase = 'https://cloud.iexapis.com/stable/stock/';
const iexAPItail = `?token=${process.env.REACT_APP_IEX_TOKEN}`;
const iexAPIcalls = '/quote';

const getIEX = (symbol) => {
  return Promise.all([
    axios.get(`${iexAPIbase}${symbol}${iexAPIcalls}${iexAPItail}`),
  ]);
};

export default getIEX;

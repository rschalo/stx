import axios from 'axios';

const iexAPIbase = 'https://cloud.iexapis.com/stable/stock/';
const iexAPItail = `?token=${process.env.REACT_APP_IEX_TOKEN}`;
const iexAPIcalls = ['/quote', '/news/last/2'];

// Docs avaialable at: https://iexcloud.io/docs/api/

const getIEX = (symbol) => {
  const iexAPIURIs = [];
  for (let i = 0; i < iexAPIcalls.length; i++) {
    iexAPIURIs.push(`${iexAPIbase}${symbol}${iexAPIcalls[i]}${iexAPItail}`);
  }
  return Promise.all([axios.get(iexAPIURIs[0]), axios.get(iexAPIURIs[1])]);
};

export default getIEX;

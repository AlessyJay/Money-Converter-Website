import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const rate =
  "https://v6.exchangerate-api.com/v6/a64bcc368910a6085c9d4180/latest/GBP";

export const ExchangeContext = createContext();

export const Exchange = ({ children }) => {
  const [currency, setCurrency] = useState([]);
  console.log(currency);

  useEffect(() => {
    const fetch = async () => {
      const read = await axios.get(rate);
      setCurrency([...Object.keys(read.data.conversion_rates)]);
    };
    fetch();
  }, []);

  return (
    <ExchangeContext.Provider value={currency}>
      {children}
    </ExchangeContext.Provider>
  );
};

import "./App.css";
import React, { useState, useEffect } from "react";
import exchange from "./picture/exchange.png";
import axios from "axios";
import Currency from "./components/InputCurrency/Currency";

function App() {
  const [currency, setCurrency] = useState([]);
  const [fromCurr, setFromCurr] = useState(`GBP`);
  const [toCurr, setToCurr] = useState(`USD`);
  const [time, setTime] = useState(``);
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const rate = `https://v6.exchangerate-api.com/v6/a64bcc368910a6085c9d4180/latest/${fromCurr}`;

  const [fromCurrValidator, setFromCurrValidator] = useState(``);

  const [checkFormCurrency, setCheckFormCurrency] = useState(true);
  let fromAmount, toAmount;

  if (checkFormCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  const amountFromCurrency = (e) => {
    setAmount(e.target.value);
  };
  const amountToCurrency = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      const read = await axios.get(rate);
      // console.log(read.data.conversion_rates[toCurr]);
      // console.log(read.data.time_last_update_utc);
      setCurrency([...Object.keys(read.data.conversion_rates)]);
      setExchangeRate(read.data.conversion_rates[toCurr]);
      setTime(read.data.time_last_update_utc);
    };
    fetch();
  }, [fromCurr, toCurr]);

  return (
    <div className="container">
      <div className="mainPage">
        <img src={exchange} alt="exchangeImg" className="exchangeImg" />
        <h1 style={{ fontSize: "64px" }}>Exchange rate API</h1>

        {/* First input */}
        <Currency
          currency={currency}
          selectedCurrency={fromCurr}
          changeCurrency={setFromCurr}
          amount={fromAmount}
          onChangeAmount={amountFromCurrency}
        />
        <span style={{ color: "red", fontSize: "24px" }}>
          {fromCurrValidator}
        </span>

        {/* Second input */}
        <Currency
          currency={currency}
          selectedCurrency={toCurr}
          changeCurrency={setToCurr}
          amount={toAmount}
          onChangeAmount={amountToCurrency}
        />

        <h3 style={{ marginTop: "3%" }}>Last update: {time}</h3>
      </div>
    </div>
  );
}

export default App;

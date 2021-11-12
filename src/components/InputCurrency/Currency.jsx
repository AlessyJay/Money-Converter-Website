import React from "react";

function Currency(props) {
  const { currency, selectedCurrency, changeCurrency, amount, onChangeAmount } =
    props;
  return (
    <div className="insert">
      <select
        value={selectedCurrency}
        onChange={(e) => changeCurrency(e.target.value)}
      >
        {currency?.map((item) => (
          <option className="curr" key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input type="text" value={amount} onChange={onChangeAmount} />
    </div>
  );
}

export default Currency;

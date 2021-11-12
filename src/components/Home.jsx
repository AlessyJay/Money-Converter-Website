import React, { useContext } from "react";
import { ExchangeContext } from "../service/data";

function Home() {
  const { currency } = useContext(ExchangeContext);
  return (
    <div>
      <h1>Hello</h1>
      <select>
        {currency?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Home;

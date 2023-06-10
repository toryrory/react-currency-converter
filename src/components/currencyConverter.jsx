import ConverterInput from "./converterInput";
import ConverterHeader from "./converterHeader";
import { Wrapper } from "./currencyConverter.styled";
import { useEffect, useState } from "react";
import usePreviousValue from "../hooks/usePreviousValue";

const { REACT_APP_API_KEY } = process.env;

const BASE_URL = `https://v6.exchangerate-api.com/v6/${REACT_APP_API_KEY}`;
const currencyToFind = ["USD", "UAH", "PLN", "CAD", "JPY", "EUR"];

const CurrencyConverter = () => {
  const [currencyOptions, setCurrecyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [fromInputVal, setFromInputVal] = useState("");
  const [toInputVal, setToInputVal] = useState("");
  const [titleValue, setTitleValue] = useState({EUR: null, USD: null, date: null})
 
  const previousFromCurrency = usePreviousValue(fromCurrency);
  const previousToCurrency = usePreviousValue(toCurrency);

  useEffect(() => {
    fetch(`${BASE_URL}/latest/UAH`)
      .then((res) => res.json())
      .then(({conversion_rates, time_last_update_utc
}) => {
        
        setTitleValue({
          EUR: (1 / conversion_rates.EUR).toFixed(2),
          USD: (1 / conversion_rates.USD).toFixed(2),
          date: time_last_update_utc,
        });
        const filtredData = Object.keys(conversion_rates).filter(
          (currency) => currencyToFind.includes(currency)
        );
        const idxUAH = filtredData.indexOf("UAH");
        const idxUSD = filtredData.indexOf("USD");
        setCurrecyOptions(filtredData);
        setFromCurrency(filtredData[idxUAH]);
        setToCurrency(filtredData[idxUSD]);
      });
  }, []);

  useEffect(() => {
    if (previousFromCurrency !== fromCurrency) {
      fetch(`${BASE_URL}/pair/${fromCurrency}/${toCurrency}/${fromInputVal}`)
        .then((res) => res.json())
        .then(({ conversion_result }) => setToInputVal(conversion_result));
    } else if (previousToCurrency !== toCurrency) {
      fetch(`${BASE_URL}/pair/${toCurrency}/${fromCurrency}/${toInputVal}`)
        .then((res) => res.json())
        .then(({ conversion_result }) =>
          setFromInputVal(conversion_result)
        );
    }
  }, [
    fromCurrency,
    toCurrency,
    previousFromCurrency,
    previousToCurrency,
    fromInputVal,
    toInputVal,
  ]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    name === fromCurrency ? setFromInputVal(value) : setToInputVal(value);
    if (name === fromCurrency) {
      fetch(`${BASE_URL}/pair/${name}/${toCurrency}/${value}`)
        .then((res) => res.json())
        .then(({ conversion_result }) =>
          setToInputVal(conversion_result.toFixed(2))
        );
    } else {
      fetch(`${BASE_URL}/pair/${name}/${fromCurrency}/${value}`)
        .then((res) => res.json())
        .then(({ conversion_result }) =>
          setFromInputVal(conversion_result.toFixed(2))
        );
    }
  };

  return (
    <Wrapper>
      <ConverterHeader titleValue={titleValue} />
      <ConverterInput
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeInput={onChangeInput}
        inputValue={fromInputVal || ""}
      />
      <span>=</span>
      <ConverterInput
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeInput={onChangeInput}
        inputValue={toInputVal || ""}
      />
    </Wrapper>
  );
};
export default CurrencyConverter;

// если инпут нейм равен фромкаренси значит при изменение инпута делать запрос фром = фромкар ту = тукар = емаунт = таргет велью
// если инпут нейм не равен фромкаренси значит при изменении инпута делать  фром = ту ту= фром емаунт велью

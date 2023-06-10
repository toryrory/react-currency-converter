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

  const previousFromCurrency = usePreviousValue(fromCurrency);
  const previousToCurrency = usePreviousValue(toCurrency);

  useEffect(() => {
    fetch(`${BASE_URL}/latest/UAH`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const filtredData = Object.keys(data.conversion_rates).filter(
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
        .then((data) => setToInputVal(data.conversion_result));
    } else if (previousToCurrency !== toCurrency) {
      fetch(`${BASE_URL}/pair/${toCurrency}/${fromCurrency}/${toInputVal}`)
        .then((res) => res.json())
        .then((data) => setFromInputVal(data.conversion_result));
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
        .then((data) => setToInputVal(data.conversion_result));
    } else {
      fetch(`${BASE_URL}/pair/${name}/${fromCurrency}/${value}`)
        .then((res) => res.json())
        .then((data) => setFromInputVal(data.conversion_result));
    }
  };

  return (
    <Wrapper>
      <ConverterHeader />
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

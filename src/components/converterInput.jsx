
const ConverterInput = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeInput,
  inputValue,
}) => {
  return (
    <div>
      <input
        type='number'
        name={selectedCurrency}
        onChange={onChangeInput}
        value={inputValue}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option, idx) => (
          <option key={`${idx}${option}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ConverterInput;
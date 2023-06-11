
const ConverterInput = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeInput,
  inputValue,
}) => {
  return (
    <div className='flex border border-violet-400 rounded'>
      <input
        className='w-20 bg-transparent text-violet-400 border-r-2 border-violet-400 focus:outline-none focus:border-gray-100'
        type='number'
        name={selectedCurrency}
        onChange={onChangeInput}
        value={inputValue}
      />
      <select
        className='bg-transparent text-violet-400'
        value={selectedCurrency}
        onChange={onChangeCurrency}
      >
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
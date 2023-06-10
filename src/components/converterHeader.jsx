import moment from "moment/moment";

const ConverterHeader = ({ titleValue }) => {
  const { EUR, USD, date } = titleValue;
  const formattedDate = moment(date).format('DD/MM/YYYY')

  return (
    <div>
      <div>
        <p>{formattedDate}</p>
        <p>
          1 EUR = <span>{EUR} UAH</span>
        </p>
        <p>
          1 USD = <span>{USD} UAH</span>
        </p>
      </div>
      <h2>Currency Converter</h2>
    </div>
  );
};
export default ConverterHeader;

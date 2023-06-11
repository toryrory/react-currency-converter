import moment from "moment/moment";

const ConverterHeader = ({ titleValue }) => {
  const { EUR, USD, date } = titleValue;
  const formattedDate = moment(date).format('DD/MM/YYYY')

  return (
    <div className='mb-5'>
      <div className='flex justify-between mb-3'>
        <p className='text-violet-400'>{formattedDate}</p>
        <div>
          <p className='text-violet-400'>
            1 EUR = <span>{EUR} UAH</span>
          </p>
          <p className='text-violet-400'>
            1 USD = <span>{USD} UAH</span>
          </p>
        </div>
      </div>
      <h2 className='text-violet-400 text-sm'>Currency Converter</h2>
    </div>
  );
};
export default ConverterHeader;

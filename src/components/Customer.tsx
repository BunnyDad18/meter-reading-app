interface Props {
  customer: {
    accountId: number;
    firstName: string;
    lastName: string;
    readings: { meterReadingDateTime: string; meterReadValue: number }[];
  };
}

const Customer = ({ customer }: Props) => {
  return (
    <>
      Account ID : {customer.accountId}
      <br />
      Name : {customer.firstName} {customer.lastName}
      <br />
      <br />
      Readings
      {customer.readings.length === 0 && <p>No readings found.</p>}
      <br />
      {customer.readings.map((reading) => (
        <p>
          Date : {reading.meterReadingDateTime}
          <br />
          Reading : {String(reading.meterReadValue).padStart(5, "0")}
        </p>
      ))}
    </>
  );
};

export default Customer;

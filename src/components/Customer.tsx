interface Props {
  customer: { accountId: number; firstName: string; lastName: string };
  readings: { meterReadingDateTime: string; meterReadValue: number }[];
}

const Customer = ({ customer, readings }: Props) => {
  return (
    <div>
      Account ID : {customer.accountId}
      <br />
      Name : {customer.firstName} {customer.lastName}
      <br />
      <br />
      Readings
      {readings.length === 0 && <p>No readings found.</p>}
      <br />
      {readings.map((item) => (
        <p>
          Date : {item.meterReadingDateTime}
          <br />
          Reading : {String(item.meterReadValue).padStart(5, "0")}
        </p>
      ))}
    </div>
  );
};

export default Customer;

import { useState } from "react";
import Customer from "./Customer";

interface Props {
  customers: {
    accountId: number;
    firstName: string;
    lastName: string;
    readings: { meterReadingDateTime: string; meterReadValue: number }[];
  }[];
  heading: string;
}

function ListGroup({ customers, heading }: Props) {
  const message = customers.length === 0 && <p>No items found</p>;

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {message}
      <ul className="list-group">
        {customers.map((listCustomer, index) => (
          <li
            key={index}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            <Customer customer={listCustomer} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;

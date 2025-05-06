import { useState } from "react";
import Customer from "./Customer";

interface Props {
  items: {
    customer: { accountId: number; firstName: string; lastName: string };
    readings: { meterReadingDateTime: string; meterReadValue: number }[];
  }[];
  heading: string;
}

function ListGroup({ items, heading }: Props) {
  const message = items.length === 0 && <p>No items found</p>;

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {message}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item.customer.accountId}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            <Customer customer={item.customer} readings={item.readings} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;

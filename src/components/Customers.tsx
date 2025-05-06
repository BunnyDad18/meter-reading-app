import axios from "axios";
import ListGroup from "./ListGroup";
import { useState } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  async function handleGetCustomerData() {
    try {
      await axios
        .get("https://localhost:7260/Readings/get-customers-with-readings", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          setCustomers(response.data);
        });
    } catch {}
  }

  async function handleDeleteReadingData() {
    try {
      await axios.delete(
        "https://localhost:7260/Readings/delete-all-readings",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCustomers([]);
    } catch {}
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleGetCustomerData}
      >
        Load Customer Data
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={handleDeleteReadingData}
      >
        Delete Readings Data
      </button>
      <ListGroup heading="Customers" items={customers} />
    </div>
  );
};

export default Customers;

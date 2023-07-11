import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "../../assets/style/table.scss";
import axios from "axios";

const DataTable = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    fetchCustomerData(); 

    const interval = setInterval(() => {
      fetchCustomerData(); 
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchCustomerData = () => {
    const apiUrl = process.env.REACT_APP_API_URL_STAGING;
    const apiEndpointPosition = process.env.REACT_APP_ENDPOINT_POS;

    axios
      .get(`${apiUrl}${apiEndpointPosition}`)
      .then((response) => {
        const data = response.data.data;
        setCustomerData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hidePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length >= 5) {
      const hiddenDigits = "*".repeat(phoneNumber.length - 5);
      return `${phoneNumber.slice(0, 2)}${hiddenDigits}${phoneNumber.slice(
        -3
      )}`;
    } else {
      return phoneNumber;
    }
  };
  const renderTableRows = () => {
    return customerData.map((customer, index) => (
      <tr key={index} className={customer.position === 1 ? "in-your-position" : ""}>
        <td>{customer.position}</td>
        <td className="username-pos">{customer.username}</td>
        <td>{hidePhoneNumber(customer.mobileNumber)}</td> {/* Memanggil hidePhoneNumber */}
        <td>
          <div className="user-point">{customer.lapCount}</div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="data-table">
      <div className="head-title">
        <h2>Pole Position</h2>
      </div>
      <Table borderless>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Username</th>
            <th>Mobile Number</th>
            <th>Lap</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <a href="#" className="more-btn">
                More
              </a>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default DataTable;

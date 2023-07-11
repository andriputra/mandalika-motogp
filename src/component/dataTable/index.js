import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "../../assets/style/table.scss";
import axios from "axios";

const DataTable = () => {
  const [customerData, setCustomerData] = useState([]);
  const [showMore, setShowMore] = useState(false); // State untuk mengontrol tombol "More"

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
      return `${phoneNumber.slice(0, 2)}${hiddenDigits}${phoneNumber.slice(-3)}`;
    } else {
      return phoneNumber;
    }
  };

  const handleMoreClick = () => {
    setShowMore((prevShowMore) => !prevShowMore); // Toggle nilai showMore saat tombol "More" atau "Less" ditekan
  };

  const renderTableRows = () => {
    let displayedData = customerData.slice(0, 5); // Hanya menampilkan 5 data secara default

    if (showMore) {
      displayedData = customerData.slice(0, 50); // Menampilkan 50 data jika tombol "More" ditekan
    }

    return displayedData.map((customer, index) => (
      <tr
        key={index}
        className={customer.position === 1 ? "in-your-position" : ""}
      >
        <td>{customer.position}</td>
        <td className="username-pos">{customer.username}</td>
        <td>{hidePhoneNumber(customer.mobileNumber)}</td>
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
              <button className="more-btn" onClick={handleMoreClick}>
                {showMore ? "Less" : "More"}
              </button>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default DataTable;
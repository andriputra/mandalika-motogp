import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "../../assets/style/table.scss";
import apiConfig from "../../apiConfig";
import axios from "axios";

const DataTable = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sumPoint, setSumPoint] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [userPosition, setUserPosition] = useState(0);
  const [customerId, setCustomerID] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const customerIdParam = urlParams.get('customerId');
    setCustomerID(customerIdParam);

    const requestOptions = {
      method: "GET",
      rl: `${apiConfig.baseURLs.STAGING.url}${apiConfig.endpoints.customer}/${customerIdParam}`,
      // headers: {
      //   "X-API-KEY": apiConfig.baseURLs.STAGING.apiKey,
      // },
    };

    axios(requestOptions)
      .then((response) => {
        const data = response.data.data;
        setCustomerData(data);
        setName(data.name);
        setPhoneNumber(data.mobileNumber);
        setSumPoint(data.point);

        setUserPosition(data.position);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderTableRows = () => {
    if (!customerData) {
      return null;
    }

    const tableRows = [];
    for (let i = 0; i < 8; i++) {
      if (i === 5 || i === 6) {
        if (userPosition > 5) {
          tableRows.push(
            <tr key={`separator-${i}`} className="separator-row">
              <td colSpan={4}></td>
            </tr>
          );
        }
        continue;
      }

      const isYourPosition = i === 7;
      const username = customerData.name;
      const displayPhoneNumber = hidePhoneNumber(customerData.mobileNumber);
      const point = customerData.point;
      const lap = Math.floor(point / 10) + 1;

      tableRows.push(
        <tr key={i} className={isYourPosition ? "in-your-position" : ""}>
          <td>{i + 1}</td>
          <td className="username-pos">{username}</td>
          <td>{displayPhoneNumber}</td>
          <td>
            <div className="user-point">{lap}</div>
          </td>
        </tr>
      );
    }
    return tableRows;
  };

  const hidePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length >= 5) {
      const hiddenDigits = "*".repeat(phoneNumber.length - 5);
      const visibleDigits = phoneNumber.slice(-3);
      return `${phoneNumber.slice(0, 2)}${hiddenDigits}${visibleDigits}`;
    } else {
      return phoneNumber;
    }
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

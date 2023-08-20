import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "../../assets/style/table.scss";
import axios from "axios";

const DataTable = () => {
  const [customerData, setCustomerData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [name, setName] = useState("");
  const [customerId, setCustomerID] = useState("");

  // GetCustomerId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL_PRODUCTION;
        const apiEndpointBalance = process.env.REACT_APP_ENDPOINT_BALANCE;

        const urlParams = new URLSearchParams(window.location.search);
        const customerIdParam = urlParams.get("customerId");
        setCustomerID(customerIdParam);

        const requestOptions = {
          method: "GET",
          url: `${apiUrl}${apiEndpointBalance}?customerId=${customerIdParam}`,
        };

        const response = await axios(requestOptions);
        const data = response.data.data;
        setName(data.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Get Endpoint Position
  useEffect(() => {
    const fetchCustomerData = (name) => {
      const apiUrl = process.env.REACT_APP_API_URL_PRODUCTION;
      const apiEndpointPosition = process.env.REACT_APP_ENDPOINT_POS;

      axios
        .get(`${apiUrl}${apiEndpointPosition}`)
        .then((response) => {
          const data = response.data.data;
          const updatedCustomerData = data.map((customer) => {
            if (customer.username === name) {
              return { ...customer, current: true };
            } else {
              return { ...customer, current: false };
            }
          });
          setCustomerData(updatedCustomerData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCustomerData(name);
    const interval = setInterval(() => {
      fetchCustomerData(name);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [name]);

  const hidePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length >= 5) {
      const hiddenDigits = "*".repeat(phoneNumber.length - 5);
      return `${phoneNumber.slice(0, 2)}${hiddenDigits}${phoneNumber.slice(-3)}`;
    } else {
      return phoneNumber;
    }
  };

  const hideSingleWord = (word) => {
    if (word.length >= 2) {
      const hiddenLetters = "*".repeat(word.length - 2);
      return `${word.slice(0, 2)}${hiddenLetters}`;
    } else {
      return word;
    }
  };
  
  const hideUsername = (username) => {
    if (username) {
      const words = username.split(" "); 
      const hiddenUsername = words.map(hideSingleWord).join(" "); 
      return hiddenUsername;
    } else {
      return username;
    }
  };

  const handleMoreClick = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const renderTableRows = () => {
    let displayedData = customerData.slice(0, 10); 
  
    if (showMore) {
      // Show all data but limit to the top 50 participants
      displayedData = customerData.slice(0, 110);
      // displayedData = customerData;
    } else if (customerData.length > 5) {
      const customerIndex = customerData.findIndex(
        (customer) => customer.username === name
      );
      if (customerIndex > 5) {
        const separator = { position: "separator" };
        displayedData.splice(10, 0, separator); // limit show default 
        displayedData.splice(11, 0, ...customerData.slice(customerIndex, customerIndex + 1)); //ypur position if after show default
      }
    }
  
    return displayedData.map((customer, index) => {
      if (customer.position === "separator") {
        return (
          <tr key={index}>
            <td colSpan={4} className="separator-row"></td>
          </tr>
        );
      }
  
      const customerClass = customer.current ? "in-your-position" : "";
  
      return (
        <tr key={index} className={customerClass}>
          <td>{customer.position}</td>
          <td className="username-pos">{hideUsername(customer.username)}</td>
          <td>{hidePhoneNumber(customer.mobileNumber)}</td>
          <td>
            <div className="user-point">{customer.lapCount}</div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="data-table">
      <div className="head-title">
        <h2>Pole Position</h2>
      </div>
      <Table borderless>
        <thead>
          <tr>
            <th>Rank</th>
            <th className="text-left">Username</th>
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

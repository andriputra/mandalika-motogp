import React, { useEffect, useState } from "react";
import imgCircuit from "../../assets/img/circuit-mandalika.png";
import PathCircuit from "../layout/pathCircuitMandalika";
// import { Modal, ModalHeader, ModalBody, Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import anime from "animejs";
import "../../assets/style/circuit.scss";
// import axios from "axios";

const Circuit = () => {
  // const [customerData, setCustomerData] = useState([]);

  // useEffect(() => {
  //   fetchCustomerData();

  //   const interval = setInterval(() => {
  //     fetchCustomerData();
  //   }, 5000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // const fetchCustomerData = () => {
  //   const apiUrl = process.env.REACT_APP_API_URL_PRODUCTION;
  //   const apiEndpointPosition = process.env.REACT_APP_ENDPOINT_POS;

  //   axios
  //     .get(`${apiUrl}${apiEndpointPosition}`)
  //     .then((response) => {
  //       const data = response.data.data;
  //       setCustomerData(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  useEffect(() => {
    var path = anime.path("#circuit path"),
      lapCounts = [0, 0, 0],
      durations = [28100, 27400, 29000, 30100, 35000, 40000];

    function startCarAnimation(target, index, duration) {
      anime({
        targets: target,
        translateX: path("x"),
        translateY: path("y"),
        rotate: path("angle"),
        easing: "linear",
        duration: duration,
        complete: function (anim) {
          lapCounts[index]++;
          startCarAnimation(target, index, duration);
        },
      });
    }

    var cars = document.getElementsByClassName("car");
    for (var i = 0; i < cars.length; i++) {
      startCarAnimation(cars[i], i, durations[i]);
    }
  }, []);

  // const [showModal, setShowModal] = useState(false);
  // const [customerInfo, setCustomerInfo] = useState({
  //   position: "",
  //   lapCount: "",
  //   point: "",
  // });
  // const handleCarClick = () => {
  //   setShowModal(true);
  // };

  return (
    <div className="mandalika">
      <div className="circuit-mdlk">
        <img src={imgCircuit} alt="Circuit Mandalika" />
      </div>
      <div className="cars">
        {[1, 2, 3, 4, 5].map((carNumber) => (
          <div
            className="car"
            key={`car-${carNumber}`}
            id={`car-${carNumber}`}
          ></div>
        ))}
        <div className="car current" id="car-6">
          YOU
        </div>
      </div>
      <PathCircuit />
      {/* <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalHeader toggle={() => setShowModal(false)}>
          Posisi Anda Saat Ini
        </ModalHeader>
        <ModalBody>
          <Table borderless>
            <tr>
              <td>Posisi Anda</td>
              <td>:</td>
              {customerData.map((customer) => {
                if (customer.current) {
                  return <td key={customer.id}>{customer.position}</td>
                } return null;
              })}
            </tr>
            <tr>
              <td>Jumlah Lap</td>
              <td>:</td>
              {customerData.map((customer) => {
                if (customer.current) {
                  return <td key={customer.id}>{customer.lapCount}</td>;
                }
                return null;
              })}
            </tr>
          </Table>
        </ModalBody>
      </Modal> */}
    </div>
  );
};

export default Circuit;

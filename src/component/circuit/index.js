import React, { useEffect, useState } from 'react';
import imgCircuit from '../../assets/img/circuit-mandalika.png';
import PathCircuit from '../layout/pathCircuitMandalika';
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import anime from 'animejs';
import '../../assets/style/circuit.scss';

const Circuit = () => {

  useEffect(() => {
    var path = anime.path('#circuit path'),
      lapCounts = [0, 0, 0],
      durations = [28100, 27400, 29000, 30100, 35000, 40000];

    function startCarAnimation(target, index, duration) {
      anime({
        targets: target,
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        easing: 'linear',
        duration: duration,
        complete: function (anim) {
          lapCounts[index]++;
          startCarAnimation(target, index, duration);
        }
      });
    }

    var cars = document.getElementsByClassName('car');
    for (var i = 0; i < cars.length; i++) {
      startCarAnimation(cars[i], i, durations[i]);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    position: '',
    lapCount: '',
    point: ''
  });
  const handleCarClick = () => {
    setShowModal(true);
  };

  return (
    <div className='mandalika'>
      <div className="circuit-mdlk">
        <img src={imgCircuit} alt="Circuit Mandalika" />
      </div>
      <div className="cars">
        {[1, 2, 3, 4, 5].map((carNumber) => (
          <div className="car" key={`car-${carNumber}`} id={`car-${carNumber}`}></div>
        ))}
        <div className="car current" id="car-6" onClick={handleCarClick}>YOU</div>
      </div>
      <PathCircuit />
      <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalHeader toggle={() => setShowModal(false)}>Posisi Anda Saat Ini</ModalHeader>
        <ModalBody>
          <Table borderless>
            <tr>
              <td>Posisi Anda</td>
              <td>:</td>
              <td>8</td>
            </tr>
            <tr>
              <td>Jumlah Lap</td>
              <td>:</td>
              <td>200</td>
            </tr>
            <tr>
              <td>Sisa Poin</td>
              <td>:</td>
              <td>{customerInfo.point}</td>
            </tr>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Circuit;

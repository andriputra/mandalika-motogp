import React, { useEffect, useState } from 'react';
import '../../assets/style/profile.scss';
import photo from '../../assets/img/profile.jpeg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Progress, Input } from 'reactstrap';
import apiConfig from '../../apiConfig';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sumPoint, setSumPoint] = useState('');
  const [modal, setModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [customerId, setCustomerID] = useState('');
  const [jumlahPoin, setJumlahPoin] = useState(10);
  const [jumlahLap, setJumlahLap] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const customerIdParam = urlParams.get('customerId');
    setCustomerID(customerIdParam);

    const requestOptions = {
      method: 'GET',
      url: `${apiConfig.baseURLs.STAGING.url}${apiConfig.endpoints.customer}/${customerIdParam}`,
      headers: {
        'X-API-KEY': apiConfig.baseURLs.STAGING.apiKey
      }
    };

    axios(requestOptions)
      .then((response) => {
        const data = response.data.data;
        setName(data.name);
        setPhoneNumber(data.mobileNumber);
        setSumPoint(data.point);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    setJumlahPoin(value);
    setJumlahLap(calculateLapAmount(value));
  };

  const calculateLapAmount = (poin) => {
    return Math.floor(poin / 10);
  };

  const handlePointDeduction = () => {
    toggleModal();
  };

  const confirmPointDeduction = () => {
    const reference = '3RDPARTYREFERENCE';
  
    const requestOptions = {
      method: 'POST',
      url: `${apiConfig.baseURLs.STAGING.url}${apiConfig.endpoints.pointDeduction}`,
      headers: {
        'X-API-KEY': apiConfig.baseURLs.STAGING.apiKey,
        'Content-Type': 'application/json',
      },
      data: {
        id: customerId,
        amount: jumlahPoin,
        reference: reference
      }
    };
  
    axios(requestOptions)
      .then((response) => {
        console.log(response.data);
        toggleModal();
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
  
        // Mengurangi nilai sumPoint
        setSumPoint(prevSumPoint => prevSumPoint - jumlahPoin);
      })
      .catch((error) => {
        toggleModal();
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 5000);
      });
  };
  
  const hidePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length >= 5) {
      const hiddenDigits = '*'.repeat(phoneNumber.length - 5);
      return `${phoneNumber.slice(0, 2)}${hiddenDigits}${phoneNumber.slice(-3)}`;
    } else {
      return phoneNumber;
    }
  };

  return (
    <React.Fragment>
      <div className="user-profile-box">
        <div className="user-image">
          <img src={photo} alt="image-user" />
        </div>
        <div className="user-profile">
          <div className="point-user" id="Pos">
            POS <span>8</span>
          </div>
          <div id="name">{name}</div>
          <div id="phoneNumber">{hidePhoneNumber(phoneNumber)}</div>
          <div className="sum-point" id="sumPoint">
            Poin MyPertamina: {sumPoint}
          </div>
          <div className="red-col label" id="Lap">
            <span>LAP&nbsp;</span>
            {jumlahLap}
          </div>
        </div>
      </div>
      <Button className="btn-action" id="Redeem" onClick={handlePointDeduction}>
        Tukar Poin
      </Button>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Tukar Poin Turbo Ultimate Experience</ModalHeader>
        <ModalBody>
          <span className="main-info">
            Anda Akan Menukar {jumlahPoin} poin dengan {jumlahLap} lap
          </span>
          <br />
          <span className="desc-info">
            Proses ini akan mengurangi poin Mypertamina yang Anda miliki saat ini : <strong>{sumPoint}</strong>
          </span>
          <input type="range" min="10" max="200" step="10" value={jumlahPoin} onChange={handleSliderChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Batal
          </Button>
          <Button color="success" onClick={confirmPointDeduction}>
            Setuju
          </Button>
        </ModalFooter>
      </Modal>

      <Alert color="success" isOpen={showSuccessAlert} toggle={() => setShowSuccessAlert(false)}>
        Selamat Poin Anda sudah berhasil di konversi ke jumlah Lap
      </Alert>

      <Alert color="danger" isOpen={showErrorAlert} toggle={() => setShowErrorAlert(false)}>
        Mohon maaf saat ini belum dapat mengkonversi point
      </Alert>
    </React.Fragment>
  );
};

export default Profile;

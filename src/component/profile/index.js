import React, { useEffect, useState } from "react";
import "../../assets/style/profile.scss";
import userProfile from "../../assets/img/profile.png";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sumPoint, setSumPoint] = useState("");
  const [modal, setModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [customerId, setCustomerID] = useState("");
  const [jumlahPoin, setJumlahPoin] = useState(10);
  const [jumlahLap, setJumlahLap] = useState(1); // atau bisa menggunakan -1
  const [customerData, setCustomerData] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL_STAGING;
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
        setPhoneNumber(data.mobileNumber);
        setSumPoint(data.point);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCustomerData = (name) => {
      const apiUrl = process.env.REACT_APP_API_URL_STAGING;
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    setJumlahPoin(value);
    setJumlahLap(calculateLapAmount(value));
  };

  const calculateLapAmount = (poin) => {
    return Math.floor(poin / 10);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handlePointDeduction = () => {
    if (!isButtonDisabled) {
      toggleModal();
    }
  };

  const confirmPointDeduction = () => {
    if (jumlahPoin < 10) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
      return;
    }

    const apiUrl = process.env.REACT_APP_API_URL_STAGING;
    const apiEndpointDeduction = process.env.REACT_APP_ENDPOINT_DEDUCTION;

    const reference = "3RDPARTYREFERENCE";

    const requestOptions = {
      method: "POST",
      url: `${apiUrl}${apiEndpointDeduction}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: customerId,
        name: name,
        mobileNumber: phoneNumber,
        amount: jumlahPoin,
        lap: jumlahLap,
        reference: reference,
      },
    };

    axios(requestOptions)
      .then((response) => {
        toggleModal();
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);

        // Mengurangi nilai sumPoint
        setSumPoint((prevSumPoint) => prevSumPoint - jumlahPoin);
        setIsButtonDisabled(true);
        setTimeLeft(600); // Menyimpan waktu tunggu 10 menit (600 detik)
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
      const hiddenDigits = "*".repeat(phoneNumber.length - 5);
      return `${phoneNumber.slice(0, 2)}${hiddenDigits}${phoneNumber.slice(
        -3
      )}`;
    } else {
      return phoneNumber;
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setIsButtonDisabled(false);
    }
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <React.Fragment>
      <div className="user-profile-box">
        <div className="user-image">
          <img src={userProfile} alt="image-user" />
        </div>
        <div className="user-profile">
          <div className="point-user" id="Pos">
            POS{" "}
            {customerData.map((customer) => {
              if (customer.current) {
                return (
                  <span className="mt-1" key={customer.username}>
                    {customer.position}
                  </span>
                );
              }
              return null;
            })}
          </div>
          <div id="name">{name}</div>
          <div id="phoneNumber">{hidePhoneNumber(phoneNumber)}</div>
          <div className="sum-point" id="sumPoint">
            Poin MyPertamina: {sumPoint}
          </div>
          <div className="red-col label" id="Lap">
            <span>LAP&nbsp;</span>
            {customerData.map((customer) => {
              if (customer.current) {
                return (
                  <span key={customer.position}>{customer.lapCount}</span>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <Button
        className="btn-action"
        id="Redeem"
        onClick={handlePointDeduction}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled && timeLeft > 0 ? (
          <span>
            Tunggu {formatTime(timeLeft)}
          </span>
        ) : (
          <span>
            Tukar Poin
          </span>
        )}
      </Button>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Tukar Poin Turbo Ultimate Experience
        </ModalHeader>
        <ModalBody>
          <span className="main-info">
            Anda Akan Menukar {jumlahPoin} poin dengan {jumlahLap} lap
          </span>
          <br />
          <span className="desc-info">
            Proses ini akan mengurangi poin MyPertamina Anda, <br />
            Poin saat ini : <strong>{sumPoint}</strong>
          </span>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={jumlahPoin}
            onChange={handleSliderChange}
          />
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

      <Alert
        color="success"
        isOpen={showSuccessAlert}
        toggle={() => setShowSuccessAlert(false)}
      >
        Selamat Poin Anda sudah berhasil di tukarkan
      </Alert>

      <Alert
        color="danger"
        isOpen={showErrorAlert}
        toggle={() => setShowErrorAlert(false)}
      >
        Mohon maaf saat ini belum bisa menukarkan poin
      </Alert>
    </React.Fragment>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import '../../assets/style/profile.scss';
import photo from '../../assets/img/profile.jpeg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Progress } from 'reactstrap';
import apiConfig from '../../apiConfig';
import axios from 'axios';

const Profile = () => {
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [sumPoint, setSumPoint] = useState('');
	const [modal, setModal] = useState(false);
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
	const [showErrorAlert, setShowErrorAlert] = useState(false);

	useEffect(() => {
		const customerID = apiConfig.customerID.custStaging;
		const requestOptions = {
			method: 'GET',
			url: `${apiConfig.baseURLs.STAGING.url}${apiConfig.endpoints.customer}/${customerID}`,
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

	const handlePointDeduction = () => {
		toggleModal();
	};

	const confirmPointDeduction = () => {
		const customerId = apiConfig.customerID.custStaging;
		const amount = 10;
		const reference = '3RDPARTYREFERENCE';

		const requestOptions = {
			method: 'POST',
			url: `${apiConfig.baseURLs.STAGING.url}${apiConfig.endpoints.pointDeduction}`,
			headers: {
				'X-API-KEY': apiConfig.baseURLs.STAGING.apiKey,
				'Content-Type': 'application/json'
			},
			data: {
				id: customerId,
				amount: amount,
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
			})
			.catch((error) => {
				// console.log('ini error:', error);
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
						Point: {sumPoint}
					</div>
					<div className="red-col label" id="Lap">
						<span>LAP&nbsp;</span>200
					</div>
				</div>
			</div>
			<Button className="btn-action" id="Redeem" onClick={handlePointDeduction}>
				Tukar Point
			</Button>

			<Modal isOpen={modal} toggle={toggleModal}>
				<ModalHeader toggle={toggleModal}>Konfirmasi Tukar Point</ModalHeader>
				<ModalBody>
					<span className='main-info'>Apakah Anda yakin ingin menukar 10 poin dengan 1 lap?</span><br />
					<span className='desc-info'>Proses ini akan mengurangi poin yang Anda miliki.</span>
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
				Poin telah dikurangi dan dikonversi menjadi 1 lap!
			</Alert>

			<Alert color="danger" isOpen={showErrorAlert} toggle={() => setShowErrorAlert(false)}>
				Terjadi kesalahan saat melakukan pengurangan poin!
			</Alert>
		</React.Fragment>
	);
};

export default Profile;

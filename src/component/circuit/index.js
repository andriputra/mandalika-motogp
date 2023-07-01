import React, { useEffect, useState } from 'react';
import ImgCircuit from '../../assets/img/circuit-mandalika.png';
import PathCircuit from '../layout/pathCircuitMandalika';
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import anime from 'animejs';
import '../../assets/style/circuit.scss';
import apiConfig from '../../apiConfig';

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
				setCustomerInfo({
					position: data.name,
					lapCount: data.mobileNumber,
					point: data.point
				});
			})
			.catch((error) => {
				console.log(error);
			});
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
				<img src={ImgCircuit} alt="Circuit Mandalika" />
			</div>
			<div className="cars">
				<div className="car" id="car-1">LH</div>
				<div className="car" id="car-2">VB</div>
				<div className="car" id="car-3">DR</div>
				<div className="car" id="car-4">DR</div>
				<div className="car" id="car-5">DR</div>
				<div className="car current" id="car-6" onClick={handleCarClick}>YOU</div>
			</div>
			<PathCircuit />
			<Modal isOpen={showModal} toggle={() => setShowModal(false)}>
				<ModalHeader toggle={() => setShowModal(false)}>Posisi Anda Saat Ini</ModalHeader>
				<ModalBody>
					<Table borderless>
						<tr>
							<td>Posisi Anda </td>
							<td>:</td>
							<td>{customerInfo.position}</td>
						</tr>
						<tr>
							<td>Jumlah Lap</td>
							<td>:</td>
							<td>{customerInfo.lapCount}</td>
						</tr>
						<tr>
							<td>Sisa Poin </td>
							<td>:</td>
							<td>{customerInfo.point}</td>
						</tr>
					</Table>
				</ModalBody>
			</Modal>
		</div >
	);
}

export default Circuit;

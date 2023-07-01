import React, { useEffect, useState } from 'react';
import '../../assets/style/profile.scss';
import photo from '../../assets/img/profile.jpeg';
import { Button } from 'reactstrap';
import apiConfig from '../../apiConfig';
import axios from 'axios';

const Profile = () => {
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [sumPoint, setSumPoint] = useState('');

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

	const handlePointDeduction = () => {
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
		console.log('customerID :', customerId);

		axios(requestOptions)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log('ini error:', error);
			});
	};

	return (
		<React.Fragment>
			<div className='user-profile-box'>
				<div className='user-image'>
					<img src={photo} alt='image-user' />
				</div>
				<div className='user-profile'>
					<div className='point-user' id='Pos'>
						POS <span>8</span>
					</div>
					<div id='name'>{name}</div>
					<div id='phoneNumber'>{phoneNumber}</div>
					<div className='sum-point' id='sumPoint'>
						Point: {sumPoint}
					</div>
					<div className='red-col label' id='Lap'>
						<span>LAP&nbsp;</span>200
					</div>
				</div>
			</div>
			<Button className='btn-action' id='Redeem' onClick={handlePointDeduction}>
				Tukar Point
			</Button>
		</React.Fragment>
	);
};

export default Profile;

import React, { useEffect, useState } from 'react';
import '../../assets/style/profile.scss';
import photo from '../../assets/img/profile.jpeg';
import { Button } from 'reactstrap';
import axios from 'axios';

const Profile = () => {
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [sumPoint, setSumPoint] = useState('');

	useEffect(() => {
		const customerID = 'bf35ab62-b56d-4106-bd3c-2cb0ce1717fd';
		axios
			.get(`https://myptm-third-party-customer-api.vsan-apps.playcourt.id/third-party-customer/v1/customers/${customerID}`, {
				headers: {
					'X-API-KEY': 'ODU0YTVjYzYtNDNhYS00NjllLThmNGUtNmFjZWM2MGI1YjJm'
				}
			})
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
		const body = {
			id: 'bf35ab62-b56d-4106-bd3c-2cb0ce1717fd',
			amount: 10,
			reference: '3RDPARTYREFERENCE'
		};

		axios
			.post('https://myptm-third-party-management-command-service.vsan-apps.playcourt.id/third-party-management-command/v1/point-deduction', body, {
				headers: {
					'X-API-KEY': 'ODU0YTVjYzYtNDNhYS00NjllLThmNGUtNmFjZWM2MGI1YjJm'
				}
			})
			.then((response) => {
				console.log(response.data);
				// Lakukan sesuatu setelah berhasil melakukan pengurangan poin
			})
			.catch((error) => {
				console.log(error);
				// Tangani kesalahan jika terjadi kesalahan dalam melakukan pengurangan poin
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

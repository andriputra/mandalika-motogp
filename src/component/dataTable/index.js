import React from 'react';
import { Table } from 'reactstrap';
import '../../assets/style/table.scss';

const DataTable = () => {
	const data = {
		data: {
			name: 'John Doe',
			mobileNumber: '1234567890',
			point: 100,
		},
	};

	const renderTableRows = () => {
		const tableRows = [];
		for (let i = 0; i < 8; i++) {
			if (i === 5 || i === 6) continue;
			const isYourPosition = i === 7;
			const username = data.data.name;
			const phoneNumber = hidePhoneNumber(data.data.mobileNumber, i);
			const point = data.data.point;

			tableRows.push(
				<tr key={i} className={isYourPosition ? 'in-your-position' : ''}>
					<td>{i + 1}</td>
					<td className="username-pos">{username}</td>
					<td id="phone-number">{phoneNumber}</td>
					<td>
						<div className="user-point">{point}</div>
					</td>
				</tr>
			);
		}
		return tableRows;
	};

	const hidePhoneNumber = (phoneNumber, i) => {
		// Implement your hidePhoneNumber logic here
		return phoneNumber;
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
						<th>Point</th>
					</tr>
				</thead>
				<tbody>{renderTableRows()}</tbody>
				<tfoot>
					<tr>
						<td colSpan={4}>
							<a href="#" className='more-btn'>More</a>
						</td>
					</tr>
				</tfoot>
			</Table>
		</div>
	);
};

export default DataTable;

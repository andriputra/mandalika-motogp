import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/style/style.scss';
import bannerTop from '../src/assets/img/banner0top.png';
import pertaminaGp23 from '../src/assets/img/pertamina-motogp-2023.png';
import myPertamina from '../src/assets/img/mypertamina.png';
import Turbo from '../src/assets/img/turbo.png';
import pertaminaGP from '../src/assets/img/pertamina-gp23.png';
import Circuit from './component/circuit';
import Profile from './component/profile';
import DataTable from './component/dataTable';

class MobileOnly extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showComponent: false
		};
	}

	componentDidMount() {
		const mq = window.matchMedia("(max-width: 768px)");

		// Fungsi handleMediaQuery akan dipanggil saat media query berubah
		mq.addListener(this.handleMediaQuery);
		this.handleMediaQuery(mq);
	}

	componentWillUnmount() {
		const mq = window.matchMedia("(max-width: 768px)");
		mq.removeListener(this.handleMediaQuery);
	}

	handleMediaQuery = (mq) => {
		if (mq.matches) {
			// Menampilkan komponen jika dalam mode mobile
			this.setState({ showComponent: true });
		} else {
			// Menyembunyikan komponen jika tidak dalam mode mobile
			this.setState({ showComponent: false });
		}
	}

	render() {
		if (!this.state.showComponent) {
			return (
				<div className='bg-default-non-mobile'>
					<h2>Hanya bisa dibuka di ponsel</h2>
				</div>
			);
		}

		return (
			<Router>
				<div className="box-order">
					<Container>
						<div className="d-flex align-items-center">
							<Col xs='7'>
								<img src={bannerTop} alt='pertamina' className='banner' />
							</Col>
							<Col xs='5'>
								<img src={pertaminaGp23} alt='pertamina Moto GP 2023' className='banner' />
							</Col>
						</div>
						<Row>
							<Col xs='5'><Profile /></Col>
							<Col xs='7'><Circuit /></Col>
						</Row>
						<div className='table-area'>
							<Row>
								<Col>
									<DataTable />
								</Col>
							</Row>
						</div>
						<Row>
							<Col xs='4'><img src={myPertamina} alt='pertamina' className='logo' /></Col>
							<Col xs='3'><img src={Turbo} alt='pertamina' className='logo' /></Col>
							<Col xs='5'><img src={pertaminaGP} alt='pertamina' className='logo' /></Col>
						</Row>
					</Container>
				</div>
			</Router>
		);
	}
}

export default MobileOnly;

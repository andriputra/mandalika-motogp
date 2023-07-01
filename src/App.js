import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/style/style.scss';
import bannerTop from '../src/assets/img/banner0top.png';
import myPertamina from '../src/assets/img/mypertamina.png';
import Turbo from '../src/assets/img/turbo.png';
import pertaminaGP from '../src/assets/img/pertamina-gp.png';
import Circuit from './component/circuit';
import Profile from './component/profile';
import DataTable from './component/dataTable';
// import '../src/server';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="box-order">
          <Container>
            <Row>
              <Col>
                <img src={bannerTop} alt='pertamina' className='banner' />
              </Col>
            </Row>
            <Row>
              <Col xs='4'><Profile /></Col>
              <Col xs='8'><Circuit /></Col>
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
              <Col xs='4'><img src={Turbo} alt='pertamina' className='logo' /></Col>
              <Col xs='4'><img src={pertaminaGP} alt='pertamina' className='logo' /></Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;

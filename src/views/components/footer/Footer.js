import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMailBulk,faPhone, faMapLocationDot} from "@fortawesome/free-solid-svg-icons";
import image1 from './../../../assets/images/logo-no-background.png'

import { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className='has-background-light mt-5'>
        <div className='columns px-6 pt-6 pb-0' style={{ width: '100%' }}>
          <div className='column is-5' style={{ marginTop: '-20px' }}>
            <img src={image1} style={{ width: "150px" }} />
            <p className='py-3'><strong>Cơ sở Hà Nội </strong><br/>
              Văn phòng Tuyển sinh: Tòa nhà FPT Polytechnic, phố Trịnh Văn Bô, phường Phương Canh, quận Nam Từ Liêm, TP Hà Nội<br/>
              (024) 8582 0808</p>
            <p>
              <strong>Cơ sở Hải Phòng </strong><br/>
              Văn phòng Tuyển sinh: 271 Lê Thánh Tông, phường Máy Chai, quận Ngô Quyền, TP Hải Phòng<br/>
              0915431313</p>
            <p>
              <strong>Cơ sở Đà Nẵng </strong><br/>
              Văn phòng Tuyển sinh: 137 Nguyễn Thị Thập, phường Hòa Minh, quận Liên Chiểu, TP Đà Nẵng<br/>
              (0236) 3710 999</p>
            <p className='has-text-danger'>*Recommendation: Best use with Chrome browser</p>
          </div>
          <div className='column is-4'>
            <p className='has-text-weight-bold'>INFORMATION</p>
            <p className='has-text-info'>Subject</p>
            <p className='has-text-info'>About</p>
            <p className='has-text-info'>Terms of Use</p>
          </div>
          <div className='column'>
            <p className='has-text-weight-bold'>ADDRESS</p>
            <div className='columns'>
              <div className='column is-1'>
                <FontAwesomeIcon icon={faMapLocationDot} />
              </div>
              <div className='column'>Cao đẳng FPT Hà Nội</div>
            </div>
            <div className='columns'>
              <div className='column is-1'>
                <FontAwesomeIcon icon={faMailBulk} />
              </div>
              <div className='column has-text-info'>QuangLN@fpt.edu.vn</div>
            </div>
            <div className='columns'>
              <div className='column is-1'>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className='column has-text-info'>096.333.1972</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

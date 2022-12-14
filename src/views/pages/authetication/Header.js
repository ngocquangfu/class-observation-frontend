import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import image1 from '../../../assets/images/svg-1.png'
import '../styles/login.css'

function Header(props) {
    const userName = localStorage.getItem("userName")
    const navigation = useNavigate()
    const profileObj = JSON.parse(localStorage.getItem("profileObj"));
    console.log('profileObj', profileObj);
  return (
    <div style={{ height: 60, background: '#0a8cf1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' , marginBottom : 40 }}>
        <div style={{ display: 'flex', width: '90', height: "80%" }}>
        <img style={{ marginLeft: 20, marginRight: 20 }} src={image1} height="40" alt=''/>
        <div style={{marginLeft:'20px',  justifyContent: 'space-between',alignItems : 'center', fontSize:22}}>
        <Link className="admin-header" to={props.link1} style={{marginLeft:"20px", color:'black'}}>{props.name1}</Link>
        <Link className="admin-header" to={props.link2} style={{marginLeft:"20px", color:'black'}}>{props.name2}</Link>
        <Link className="admin-header" to={props.link3} style={{marginLeft:"20px", color:'black'}}>{props.name3}</Link>
        </div>
        
        </div>
        

        <div style={{ display: 'flex', alignItems: 'center', color: 'black', fontSize: 24, fontWeight: 500 }}>
                    <div>
                        {profileObj?.name}
                    </div>
                    <div className="img-cover" style={{ marginRight: 20, marginLeft: 30, position: 'relative' }}>
                        <img style={{ borderRadius: '50%' }} src={profileObj?.imageUrl} width="40px" />
                        <div className='tooltip-avatar'>
                            <div className="tooltip-avatar-item" style={{ fontSize: 16, padding: '4px 10px', display: 'flex', alignContent: 'center', flex: 1 }}>Xem thông tin</div>
                            <div onClick={() => {
                                localStorage.clear()
                                navigation('/login')
                            }} className="tooltip-avatar-item" style={{ fontSize: 16, padding: '4px 10px', display: 'flex', alignContent: 'center', flex: 1 }}>Logout</div>
                        </div>
                    </div>
                </div>
    </div>
  );
};

export default Header;
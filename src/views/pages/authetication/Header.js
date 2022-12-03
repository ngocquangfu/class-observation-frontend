import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import image1 from '../../../assets/images/svg-1.svg'

function Header(props) {
    const userName = localStorage.getItem("userName")
    const navigation = useNavigate()

  return (
    <div style={{ height: 60, background: '#0a8cf1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' , marginBottom : 40 }}>
        <div style={{ display: 'flex', width: '90', height: "80%" }}>
        <img style={{ marginLeft: 20, marginRight: 20 }} src={image1} height="40" alt=''/>
        <div style={{marginLeft:'20px',  justifyContent: 'space-between', fontSize:"25px"}}>
        <Link to={props.link1} style={{marginLeft:"20px", color:'white'}}>{props.name1}</Link>
        <Link to={props.link2} style={{marginLeft:"20px", color:'white'}}>{props.name2}</Link>
        <Link to={props.link3} style={{marginLeft:"20px", color:'white'}}>{props.name3}</Link>
        </div>
        </div>
        

        <div style={{ display: 'flex', color: 'black', fontSize: 24, fontWeight: 500 }}>
            <div>
                {userName}
            </div>
            <div style={{marginLeft: 20, marginRight: 20}}>
                <UserOutlined height='60px' />
            </div>
            <div onClick={() => {
                localStorage.clear()
                navigation('/login')
            }} style={{marginRight : 20 , cursor : 'pointer'}}>
                LogOut
            </div>
        </div>
    </div>
  );
};

export default Header;
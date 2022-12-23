
import React from 'react';
import '../styles/home.css';
import {
    BrowserRouter as Router,Link
  } from "react-router-dom";
  import image1 from '../../../assets/images/fpt-logo.png'
  import image2 from '../../../assets/images/education.png'


const Home = () => {
    
    return (
        <div className='home'>
            <div className='columns' style={{display: "flex", justifyContent: "space-between", marginTop: "0.75rem"}}>
                <div className='fpt-logo'>
                    <img src={image1}></img>
                </div>
                <Link to="/login">
                    <div className='login'>
                        <button className='button-login'>
                            Đăng nhập
                        </button>
                    </div>
                </Link>
            </div>
            <hr style={{margin: 0, color: 'gray'}}/>
            <div className='home-container' style={{display: "flex", justifyContent: "space-evenly"}}> 
                <div className='title'>
                    <h1 >Học tập mang tính xây dựng xã hội</h1>
                    <h3 className='content'>Kiến tạo kiến thức và cá nhân hóa cách học để phát huy hết khả năng của người học.</h3>
                    <Link to="/login">
                        <button className='button-join'>
                            Đăng nhập
                        </button>
                </Link>
                </div>
                <div>
                    <img src={image2}></img>
                </div>
            </div>
        </div>
    );
};

export default Home;
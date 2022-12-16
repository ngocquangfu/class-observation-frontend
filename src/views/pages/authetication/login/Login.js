import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import NavBar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import { apiClient } from '../../../../api/api-client';
import { gapi } from "gapi-script";
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import { Select } from 'antd';
import image1 from '../../../../assets/images/logofpoly.png';
import image2 from '../../../../assets/images/logogg.png';
import { openNotificationWithIcon } from '../../request/notification';

const Login = () => {
    const [listCampus, setListCampus] = React.useState([])
    const [campus, setCampus] = React.useState(null)
    const [notify, setNotify] = React.useState("")


    const navigation = useNavigate()
    const _requestData = async () => {
        const { data } = await apiClient.get('/api/campus-dropdown-list')
        const convertData = data.map((i, idx) => {
            return {
                value: i.value,
                label: i.name
            }
        })
        setListCampus(convertData)
    }
    const handleLogin = async (ggApi) => {
        console.log('gg', ggApi);
        localStorage.setItem("profileObj", JSON.stringify(ggApi.profileObj))
        if (campus) {
            const body = {
                token: ggApi.tokenId,
                campusId: campus
            }

            
            const { data } = await apiClient.post('/auth/google', body)
            console.log('data9998', data.accessToken);

            if (data.accessToken!=null) {
                console.log('data', data);
                const role = data.setRole.map(i => i.id)
                console.log("role", role);
                localStorage.setItem("access_token", data.accessToken)
                localStorage.setItem("campusId", data.campusId)
                localStorage.setItem("userId", data.userId)
                localStorage.setItem("userName", data.userName)
                localStorage.setItem("role", JSON.stringify(role))

                if (parseInt(role) === 1) {
                    navigation("/admin")
                } if (parseInt(role) === 2) {
                    navigation("/lecture")
                    navigation("/head-plan")

                } if (parseInt(role) === 3) {
                    navigation("/train")
                } if (role == 4) {
                    navigation("/lecture")
                }
                if (role == 5) {
                    navigation("/train")
                }
                


            } else{
            openNotificationWithIcon("error", "Tài khoản của bạn không được phép đăng nhập vào hệ thống")
            }
            

            
        }
    }
    const onChange = (value) => {
        setCampus(value)
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const handleFailLogin = (err) => {
        console.log(err);
        openNotificationWithIcon("", "Đăng nhập thất bại")
    }
    useEffect(() => {
        _requestData()
    }, [])
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_API_ID,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);
    return (
        <><NavBar />
            <div className="wrap-login">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <img src={image1} width='280' />
                    </div>
                    <div className='box-login'>
                        <div style={{ color: '#252525', fontSize: 32, fontWeight: 600 }}>Đăng nhập</div>
                        <div style={{ margin: "20px 0" }}>
                            <span style={{ color: 'red' }}>{notify}</span>
                            <Select
                                size='large'
                                showSearch
                                placeholder="Chọn cơ sở"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={listCampus}
                                style={{ width: "370px", alignItems: 'center' }}
                                className='choose-campus'
                            />
                        </div>
                        <div className='login-google'>
                            <div style={{ marginTop: "5px", marginLeft: "15px" }}>
                                <img src={image2} width='28' style={{ alignItems: 'center' }} />
                            </div>
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_API_ID}
                                buttonText="Sign in with @fpt.edu.vn"
                                onSuccess={handleLogin}
                                onFailure={handleFailLogin}
                                cookiePolicy={'single_host_origin'}
                                className='button-google'
                                icon={false}
                                style={{ boxShadow: "none" }}
                            >
                            </GoogleLogin>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import NavBar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import { apiClient } from '../../../../api/api-client';
import { Select } from 'antd';
import { gapi } from "gapi-script";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import image1 from '../../../../assets/images/svg-1.svg';
import { textAlign } from '@mui/system';
const Login = () => {
    const [listCampus, setListCampus] = React.useState([])
    const [campus, setCampus] = React.useState(null)

    const navigation = useNavigate()
    const _requestData = async () => {
        const { data } = await apiClient.get('/api/campusDropdownList')
        const convertData = data.map((i, idx) => {
            return {
                value: i.value,
                label: i.name
            }
        })
        setListCampus(convertData)
    }
    const handleLogin = async (ggApi) => {
        if (campus) {
            const body = {
                token: ggApi.tokenId,
                campusId: campus
            }
            const { data } = await apiClient.post('/auth/google', body)
            if (data.accessToken) {
                localStorage.setItem("ACCESS_TOKEN", data.accessToken)
                navigation('/admin')
            }

        }
    }
    const onChange = (value) => {

        setCampus(value)
        console.log("goi toi day")
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const handleFailLogin = (err) => {
        console.log(err);
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
    return (<>
        <NavBar />
        <div className="login">
            <div className='form-login'>
                <div style={{ display: 'relative', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <img src={image1} width='280' />
                    </div>
                    <span className="custom-dropdown big">
                        {/* <select >


                            {listCampus.map((campus) => (
                                <option key={campus.value} onChange={onChange} >
                                    {campus.label}

                                </option>
                            ))}

                           
                        </select> */}
                         <Select
                                size='large'
                                showSearch
                                placeholder="Select a campus"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={listCampus}
                            />
                    </span>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_API_ID}
                        buttonText="Sign in with @fpt.edu.vn"
                        className='login-with-google-btn'
                        onSuccess={handleLogin}
                        onFailure={handleFailLogin}
                        cookiePolicy={'single_host_origin'}
                    >
                    </GoogleLogin>

                    <br />


                </div>

            </div>
        </div>
        <Footer />
    </>
    );
};

export default Login


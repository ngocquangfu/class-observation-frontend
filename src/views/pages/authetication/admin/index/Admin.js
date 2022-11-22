import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AdminLecture from '../admin-lecture/index';
import AdminHOS from '../admin-head-subject/index';
import AdminTraining from '../admin-trainning/index';
import image1 from '../../../../../assets/images/svg-1.svg'




const Admin = () => {
    const [adminIndex , setAdminIndex] = useState(1)

    const objAdmin = {
        1 : <AdminLecture />,
        2 : <AdminHOS />,
        3 : <AdminTraining />
    }
    const handleClick = (idx) => {
        setAdminIndex(idx)
    }
    const navigation = useNavigate()
    return (
        <div>
            <div style={{ height: 60, background: '#0a8cf1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' , marginBottom : 40 }}>
                <div style={{ display: 'flex', width: '90', height: "80%" }}>
                <img style={{ marginLeft: 20, marginRight: 20 }} src={image1} height="40" />
                    <div>
                        <Button type="ghost" onClick={() => handleClick(1)} style={{ background: adminIndex == 1 ? 'yellow' : '#b1b7bb' }} shape="round" size='large'>
                            Lecture
                        </Button>
                        <Button type="ghost" onClick={() => handleClick(2)} style={{ background: adminIndex == 2 ? 'yellow' : '#b1b7bb' ,marginLeft: 20, marginRight: 20}} shape="round" size='large'>
                            Head Of Subject
                        </Button>
                        <Button type="ghost" onClick={() => handleClick(3)} style={{ background: adminIndex == 3 ? 'yellow' : '#b1b7bb' }} shape="round" size='large'>
                            Training
                        </Button>
                    </div>
                </div>

                <div style={{ display: 'flex', color: 'black', fontSize: 24, fontWeight: 500 }}>
                    <div>
                        ThangNg
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

            <div>
                {objAdmin[adminIndex]}
            </div>
        </div>
    );
};

export default Admin;
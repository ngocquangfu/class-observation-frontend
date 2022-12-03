import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import LectureDetailResult from './LectureDetailResult';
import { apiClient } from '../../../../api/api-client';
import { openNotificationWithIcon } from '../../request/notification';
import { useId } from 'react';
import Header from '../Header';

const LectureResult = () => {
    const [listData, setListData] = useState([]);
    const location = useLocation()
    const role = localStorage.getItem('role');
    const id = window.location.pathname.split("/")[2];
    const navigation = useNavigate()
    const onChange = () => {

    }
    const _requestData = async () => {
        const { data } = await apiClient.get(`/api/result-observation-slot?oSlotId=${id}`)
        setListData(data.items)
    }
    useEffect(() => {
        _requestData()
    }, [])
    return (<>
        {role == "[2]" ?
            <Header name1="Lịch dự giờ" link1="/lecture" name2="Kết quả" link2="/lecture-result" name3="Trưởng bộ môn" link3="/head-plan" />
            :
            <Header name1="Lịch dự giờ" link1="/lecture" name2="Kết quả" link2="/lecture-result" />}
        <div style={{ padding: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 500, marginBottom: 32 }}>Thông tin nhận :</div>
            <Tabs
                onChange={onChange}
                type="card"
                size='large'
                items={new Array(3).fill(null).map((_, i) => {
                    const id = String(i + 1);
                    return {
                        label: `Đánh giá ${id}`,
                        key: id,
                        children: <LectureDetailResult id={id} item={listData[i] || {}} />,
                    };
                })}
            />
            
        </div>
    </>
    );
};

export default LectureResult
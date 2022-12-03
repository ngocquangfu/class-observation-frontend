import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import AssessmentPlanDetail from './AssessmentPlanDetail';
import { apiClient } from '../../../../api/api-client';
import { openNotificationWithIcon } from '../../request/notification';
import Header from '../Header';
const AssessmentPlan = () => {
    const [listData, setListData] = useState([]);
    const location = useLocation()
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
        <Header name1="Giảng viên" link1="/lecture" name2="Trưởng bộ môn" link2="/head-plan" />
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
                        children: <AssessmentPlanDetail id={id} item={listData[i] || {}} />,
                    };
                })}
            />
            <div className='columns mt-5'>
                <div className='column is-1' style={{ marginLeft: "40rem" }}>
                    <button onClick={async () => {
                        const { data } = await apiClient.post(`api/pass-observation-slot?oSlotId=${id}
                        &pass=${2}`)
                        console.log("idddd", id)
                        if (data.status == '200') {
                            openNotificationWithIcon("success", "Đánh giá thành công");
                            navigation('-p/headlan')
                        }
                    }} className='button is-danger'>
                        Không đạt
                    </button>
                </div>
                <div onClick={async () => {
                    const { data } = await apiClient.post(`api/pass-observation-slot?oSlotId=${id}&pass=${1}`)
                    if (data.status == '200') {
                        openNotificationWithIcon("success", "Đánh giá thành công");
                        navigation('/head-plan')
                    }
                }} className='column'>
                    <button className='button is-success'>
                        Đạt yêu cầu
                    </button>
                </div>
            </div>
        </div>
    </>
    );
};

export default AssessmentPlan;
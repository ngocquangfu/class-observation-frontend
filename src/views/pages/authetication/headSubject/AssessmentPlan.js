import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import AssessmentPlanDetail from './AssessmentPlanDetail';
import { apiClient } from '../../../../api/api-client';
import { openNotificationWithIcon } from '../../request/notification';
import Header from '../Header';
import { green } from '@mui/material/colors';
const AssessmentPlan = () => {
    const [listData, setListData] = useState([]);
    const [result, setResult] = useState();
    const id = window.location.pathname.split("/")[2];
    const navigation = useNavigate()
    const onChange = () => {
    }
    const _requestData = async () => {
        const { data } = await apiClient.get(`/api/result-observation-slot?oSlotId=${id}`)
        setListData(data.items)

    }
    const getResultId = async () => {
        const { data } = await apiClient.get(`/api/list-observation-slot-plan?planId=${id}`)
        console.log("dddsf", data.items[0].result)
        setResult(data.items[0].result)

    }
    useEffect(() => {
        _requestData()
        getResultId()

    }, [])
    return (<>
        <Header name1="Giảng viên" link1="/lecture" name2="Trưởng bộ môn" link2="/head-plan" />
        <div style={{ padding: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 500, marginBottom: 15 }}>Thông tin chi tiết:</div>
            <div style={{ fontSize: 20, fontWeight: 400, marginBottom: 15 }}>Trạng thái: {result == 1 ? <span style={{ fontSize: 20, fontWeight: 700, marginBottom: 32, color: 'green' }}>Đạt</span> : result == 2 ? <span style={{ fontSize: 20, fontWeight: 700, marginBottom: 32, color: 'red' }}>Không đạt</span> : <span style={{ fontSize: 20, fontWeight: 700, marginBottom: 32, color: 'blue' }}>Chờ Kết quả</span>}</div>
            
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
                        <button  onClick={async () => {
                            const { data } = await apiClient.post(`api/pass-observation-slot?oSlotId=${id}&pass=${2}`)
                            console.log("idddd", id)
                            if (data.status == '200') {
                                openNotificationWithIcon("success", "Đánh giá thành công");
                                navigation('/head-plan')
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
                        <button  className='button is-success'>
                            Đạt yêu cầu
                        </button>
                    </div>
                </div> 
        </div>
    </>
    );
};

export default AssessmentPlan;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, Modal } from 'antd';
import AssessmentPlanDetail from './AssessmentPlanDetail';
import { apiClient } from '../../../../api/api-client';
import { openNotificationWithIcon } from '../../request/notification';
import Header from '../Header';
import Footer from '../../../components/footer/Footer';
const AssessmentPlan = () => {
    const [listData, setListData] = useState([]);
    const [result, setResult] = useState(0);
    const [show, setShow] = useState(true)
    const [reviewnum, setReviewnum] = useState(0)
    const { confirm } = Modal;
    const id = window.location.pathname.split("/")[2];
    const navigation = useNavigate()
    const [statusId, setStatusId] = useState(0);
    const statusPlan = localStorage.getItem("statusPlan")
    const onChange = () => {
    }
    const userId = localStorage.getItem('userId');
    const [semesterId, setSemesterId] = useState(1);

    const _requestData = async () => {
        const { data } = await apiClient.get(`/api/result-observation-slot?oSlotId=${id}`)
        setListData(data.items)
        console.log("listData111", listData.length)

    }


    const checkShowReview = async () => {
        const { data } = await apiClient.get(`/api/status-observation-slot?slotId=${id}`)
        if (statusPlan == 0) {
            setShow(false)
        } else if (data?.items != 0) {
            setResult(data.items)
            setShow(false)
            
        }

    }
    function showConfirm(value, pass) {
        confirm({
            title: 'Bạn đã chắc chắn nộp chưa?',

            async onOk() {
                try {
                    const { data } = await apiClient.post(`api/pass-observation-slot?oSlotId=${value}&pass=${pass}`)
                    if (data.status == '200') {
                        openNotificationWithIcon("success", "Đánh giá thành công")
                        navigation('/head-plan')
                    }
                } catch (e) {

                }
            },

        });
    }
    useEffect(() => {
        _requestData()
        checkShowReview()

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
            {show && <div className='columns mt-5'>
                <div className='column is-1' style={{ marginLeft: "40rem" }}>
                    <button onClick={async () => {
                        showConfirm(id, 2)
                    }} className='button is-danger'>
                        Không đạt
                    </button>
                </div>
                <div onClick={async () => {

                    showConfirm(id, 1)
                }} className='column'>
                    <button className='button is-success'>
                        Đạt yêu cầu
                    </button>
                </div>
            </div>}
        </div>
        <Footer />
    </>
    );
};

export default AssessmentPlan;
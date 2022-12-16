import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs,Modal } from 'antd';
import AssessmentPlanDetail from './AssessmentPlanDetail';
import { apiClient } from '../../../../api/api-client';
import { openNotificationWithIcon } from '../../request/notification';
import Header from '../Header';
const AssessmentPlan = () => {
    const [listData, setListData] = useState([]);
    const [result, setResult] = useState(0);
    const [show , setShow] = useState(true)
    const [reviewnum , setReviewnum] = useState(0)
    const { confirm } = Modal;
    const id = window.location.pathname.split("/")[2];
    const navigation = useNavigate()
    const onChange = () => {
    }
    const _requestData = async () => {
        const { data } = await apiClient.get(`/api/result-observation-slot?oSlotId=${id}`)
        setListData(data.items)
        console.log("lisdata", listData)

    }
    // const getResultId = async () => {
    //     const { data } = await apiClient.get(`/api/list-observation-slot-plan?planId=${id}`)
    //     console.log("dddsf", data.items[0].result)
    //     setResult(data.items[0].result)

    // }
    const checkShowReview = async () => {
        const { data } = await apiClient.get(`/api/status-observation-slot?slotId=${id}`)
        if(data?.items != 0){
            setResult(data.items)
            console.log("test result", data.items)
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
                // onCancel()
              }
            } catch (e) {
            //   openNotificationWithIcon("error", "Đánh giá thất bại")
            }
          },
        //   onCancel() { },
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
                {show||listData?.length>2?<div></div>:<div className='columns mt-5'>
                    <div className='column is-1' style={{ marginLeft: "40rem" }}>
                        <button  onClick={async () => {
                            // const { data } = await apiClient.post(`api/pass-observation-slot?oSlotId=${id}&pass=${2}`)
                            // console.log("idddd", id)
                            // if (data.status == '200') {
                            //     openNotificationWithIcon("success", "Đánh giá thành công");
                            //     navigation('/head-plan')
                            // }
                            showConfirm(id,2)
                        }} className='button is-danger'>
                            Không đạt
                        </button>
                    </div>
                    <div onClick={async () => {
                        // const { data } = await apiClient.post(`api/pass-observation-slot?oSlotId=${id}&pass=${1}`)
                        // if (data.status == '200') {
                        //     openNotificationWithIcon("success", "Đánh giá thành công");
                        //     navigation('/head-plan')
                        // }
                        showConfirm(id,1)
                    }} className='column'>
                        <button  className='button is-success'>
                            Đạt yêu cầu
                        </button>
                    </div>
                </div> }
        </div>
    </>
    );
};

export default AssessmentPlan;
import { Modal, Table, Button, Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/lecture.css';
import { apiClient } from '../../../../api/api-client';
import LectureDetailContainer from './LectureDetailContainer';
import Header from '../Header';
import { useId } from 'react';
import { TableCustom } from '../../helper/style-component';
import Footer from '../../../components/footer/Footer';
const LectureResultContainer= () => {

    const [listData, setListData] = useState();
    const [listSemesters, setListSemesters] = useState();
    const [semesterId, setSemesterId] = useState(2);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState({});
    const campusId = localStorage.getItem('campusId');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const navigation = useNavigate();
    const handleNavigation = (record) => {
      navigation(`/lecture-result/${record.id}`);
    }
    const getSemestersCurrent = async () => {
      const { data } = await apiClient.get(`/api/semester-current`)
      setSemesterId(data?.items)
  
    }
    const _requestData = async () => {
      const { data } = await apiClient.get(`/api/lecture/list-result-observation-review?campusId=${campusId}&semesterId=${semesterId}&accountId=${userId}`)
      data.items = data.items.map((item, idx) => {
        var date = new Date(`${item.slotTime}`);
        item.slotTime =
          ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return item;
      })
      setListData(data.items);
    }
  
    const getSemesters = async () => {
      const { data } = await apiClient.get('/api/semester-list')
      var ReverseArray = [];
    var length = Object.keys(data).length;
    for (var i = length - 1; i >= 0; i--) {
      ReverseArray.push(data[i]);
      console.log("dataa", data[i])
    }
    setListSemesters(ReverseArray);
    }
  
    useEffect(() => {
      getSemesters()
      getSemestersCurrent()
    }, [])
    useEffect(() => {
      _requestData();
    }, [semesterId])
    const showModal = (record) => {
      setOpen(true);
      setDetail(record);
    };
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 3000);
    };
    const handleCancel = () => {
      setOpen(false);
    };
  
    const columns = [
      {
        title: 'STT',
      dataIndex: 'stt',
      render: (text, record, index) => index + 1,
      },
      {
        title: 'Tên GV được dự giờ',
        dataIndex: 'lectureName',
        key: 'lectureName',
      },
      {
        title: 'Ca học',
        dataIndex: 'slotName',
        key: 'slotName',
      },
      {
        title: 'Thời gian',
        dataIndex: 'slotTime',
        key: 'slotTime',
      },
      {
        title: 'Lớp',
        dataIndex: 'className',
        key: 'className',
      },
      {
        title: 'Phòng',
        dataIndex: 'roomName',
        key: 'roomName',
      },
      {
        title: 'Tên môn học',
        dataIndex: 'subjectName',
        key: 'subjectName',
      },
      {
        title: 'Bộ môn',
        dataIndex: 'departmentName',
        key: 'departmentName',
      },
      {
        title: 'Kết quả',
        key: 'result',
        dataIndex: 'result',
        render: (text, record) => (
          <Button onClick={() => handleNavigation(record)}>
            {"Kết quả"}
          </Button>
        ),
      },
    ];
   
    const semesterColums = [
      {
        title: 'Kì học',
        dataIndex: 'totalPoint',
        key: 'totalPoint',
        render: (text, record) => (
          <Button style={{ width: 130 }} onClick={() => setSemesterId(record.value)} className='is-clickable' >
            {record.name}
          </Button>
        ),
      },
    ]
  
    return (
      <>
      <div>
        {role=="[2]"?
     <Header name1="Lịch dự giờ" link1="/lecture" name2="Kết quả" link2="/lecture-result" name3="Trưởng bộ môn" link3="/head-plan"/>
      :
     <Header name1="Lịch dự giờ" link1="/lecture" name2="Kết quả" link2="/lecture-result" />}
        <p className='has-text-centered has-text-weight-bold is-size-3'>Kết quả đánh giá</p>
        
        <Drawer
          width={620}
          open={open}
          title={
            <div className='has-text-centered has-text-weight-bold is-size-4'>Phiếu đánh giá chi tiết</div>
          }
          onOk={handleOk}
          onClose={handleCancel}
          footer={null}
        >
          {detail.id && <LectureDetailContainer record={detail} onCancel={handleCancel} />}
        </Drawer>
        <div className='columns'>
          <div className='column ml-4 is-1 mr-6'>
            {listSemesters?.length > 0 && <Table columns={semesterColums} dataSource={listSemesters} pagination={false} />}
  
          </div>
          <div className='column'>
            {listData?.length > 0 && <TableCustom columns={columns} dataSource={listData} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20']}}/>}
          </div>
        </div>
      </div>
      <Footer/>
      </>
    );
  };

export default LectureResultContainer
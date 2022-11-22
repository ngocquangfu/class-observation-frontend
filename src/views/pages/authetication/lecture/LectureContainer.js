import { Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/lecture.css';
import { apiClient } from '../../../../api/api-client';
import LectureDetailContainer from './LectureDetailContainer';
const LectureContainer = () => {

  const [listData, setListData] = useState();
  const [listSemesters, setListSemesters] = useState();
  const [semesterId, setSemesterId] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState();
  const campusId = localStorage.getItem('campusId');
  const userId = true ? 15 : localStorage.getItem('userId');
  const navigation = useNavigate();
  const _requestData = async () => {
    const {data} = await apiClient.get(`/api/lecture/list-observation-review?campusId=${campusId}&semesterId=${semesterId}&accountId=${userId}`)
    data.items = data.items.map((item, idx) => {
      var date = new Date(`${item.slotTime}`);
        item.slotTime =
        ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return item;
    })
    setListData(data.items);
    console.log("convert: ", data.items);
  }

  const getSemesters = async () => {
    const {data} = await apiClient.get('/api/semester-list')
    
    setListSemesters(data);
    console.log("semesterList: ", data.items);
  }
  
  useEffect(() => {
    getSemesters()
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
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
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
      title: 'Chi tiết',
      dataIndex: 'totalPoint',
      key: 'totalPoint',
      render: (text, record) => (
        <button onClick={() => showModal(record)}>
          {"Chi tiết"}
        </button>
       ),
    },
  ];

  const semesterColums = [
    {
      title: 'Kì học',
      dataIndex: 'totalPoint',
      key: 'totalPoint',
      render: (text, record) => (
        <button onClick={() => setSemesterId(record.value)} className='is-clickable' >
          {record.name}
        </button>
       ),
    },
  ]

  const handleNavigation = (record) => {
    navigation(`/lecture/${record.id}`);
  }
  return (
    <div>
        
        <p className='has-text-centered has-text-weight-bold is-size-3'>Danh sách đi dự giờ của giảng viên</p>
        <Modal
          open={open}
          title="Chi tiết"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          >
          <LectureDetailContainer data={detail} />
        </Modal>
        <div className='columns'>
          <div className='column ml-4 is-1 mr-6'>
              {listSemesters?.length > 0 && <Table columns={semesterColums} dataSource={listSemesters} pagination={false}/>}

          </div>
          <div className='column'>
              {listData?.length > 0 && <Table columns={columns} dataSource={listData} />}
          </div>
        </div>
    </div>
  );
};

export default LectureContainer;
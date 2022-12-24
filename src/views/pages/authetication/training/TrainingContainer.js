import { Modal, Table, Button, Drawer } from 'antd';
import { openNotificationWithIcon } from '../../request/notification';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/plan.css';
import { apiClient } from '../../../../api/api-client';
import TrainingChangeContainer from './TrainingChangeContainer';
import TrainingDetail from './TrainingDetail';
import Header from '../Header';
import { TableCustom } from '../../helper/style-component';
import Footer from '../../../components/footer/Footer';


const TrainingContainer = () => {

  const [listData, setListData] = useState();
  const [listSemesters, setListSemesters] = useState();
  const [semesterId, setSemesterId] = useState(2);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const campusId = localStorage.getItem('campusId');
  const userId = true ? 15 : localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  const navigation = useNavigate();
  const _requestData = async () => {
    const { data } = await apiClient.get(`/api/list-search-observation-plan?campusId=${campusId}&semesterId=${semesterId}`)
    data.items = data.items.map((item, idx) => {
      var createdAt = new Date(`${item.createdAt}`);
      var updatedAt = new Date(`${item.updatedAt}`);
      var planStatus = item.planStatus;
      item.createdAt =
        ((createdAt.getMonth() > 8) ? (createdAt.getMonth() + 1) : ('0' + (createdAt.getMonth() + 1))) + '/' + ((createdAt.getDate() > 9) ? createdAt.getDate() : ('0' + createdAt.getDate())) + '/' + createdAt.getFullYear();
      item.updatedAt =
        ((updatedAt.getMonth() > 8) ? (updatedAt.getMonth() + 1) : ('0' + (updatedAt.getMonth() + 1))) + '/' + ((updatedAt.getDate() > 9) ? updatedAt.getDate() : ('0' + updatedAt.getDate())) + '/' + updatedAt.getFullYear();
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
    const role = localStorage.getItem('role');
    if (!role.includes(5)) {
      navigation('/login');
    }
    //  if (!role.includes(3)) {
    //   navigation('/login');

    // }
    getSemesters()
    getSemestersCurrent()
  }, [])
  useEffect(() => {
    _requestData();
  }, [semesterId])
  const showModal = (record) => {
    setOpen(true);
  };
  const showDetail = async (record) => {
    // console.log('record' ,record);
    // const {data} = apiClient.get(`api/list-observation-slot-plan?planId=${record.id}`)
    // console.log("aaa" ,data);

    setOpenDetail(true)
    setDetail(record);
  };


  console.log("detail: ", detail);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDetail(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
    setOpenDetail(false);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Bộ môn',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'planStatus',
      key: 'planStatus',
      render: (planStatus) => {
        if (planStatus == 1) {
          return "Đã duyệt"
        } else if (planStatus == 0) {
          return "Đợi duyệt"
        } else {
          return "Từ chối"
        }
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Ngày chỉnh sửa',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Chi tiết',
      dataIndex: 'totalPoint',
      key: 'totalPoint',
      render: (text, record) => (
        <Button onClick={() => showDetail(record)}>
          {"Chi tiết"}
        </Button>
      ),
    },
    {
      title: 'Đồng ý',
      dataIndex: 'totalPoint',
      key: 'totalPoint',
      render: (text, record) => (
        {
          ...record.planStatus == 0 ?
            <Button type='primary' {...record.planStatus != 0 ? 'disabled' : ''} onClick={() => approved(record)}>
              {"Đồng ý"}
            </Button>
            : null
        }
      ),
    },
    {
      title: 'Từ chối',
      dataIndex: 'totalPoint',
      key: 'totalPoint',
      render: (text, record) => (
        {
          ...record.planStatus == 0 ?
            <Button danger {...record.planStatus != 0 ? 'disabled' : ''} onClick={() => reject(record)}>
              {"Từ chối"}
            </Button>
            : null
        }
      ),
    },
  ];

  const approved = async (record) => {
    const { data } = await apiClient.post(`/api/approve-observation-plan?planId=${record.id}&statusId=1`);
    if (data.status == 200) {
      openNotificationWithIcon("success", "Duyệt thành công")
      _requestData();
    } else {
      openNotificationWithIcon("error", "Thất bại")
    }
  }
  const reject = async (record) => {
    const { data } = await apiClient.post(`/api/approve-observation-plan?planId=${record.id}&statusId=2`);
    if (data.status == 200) {
      openNotificationWithIcon("success", "Từ chối thành công")
      _requestData();
    } else {
      openNotificationWithIcon("error", "Thất bại")
    }
  }
  const getSemestersCurrent = async () => {
    const { data } = await apiClient.get(`/api/semester-current`)
    setSemesterId(data?.items)

  }
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

  return (<>
    <div>
      <Header />
      <div className='columns'>
        <p className='column is-10 has-text-centered has-text-weight-bold is-size-3'>Danh sách kế hoạch theo kì</p>
        {role == "[5]" ?
          <button className='button is-info ml-6 mt-4' onClick={() => showModal()} >Thay đổi tiêu chí</button> : <div></div>}
      </div>
      <Modal
        open={open}
        title="Thay đổi tiêu chí"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <TrainingChangeContainer data={listData} />
      </Modal>
      <Drawer className='train-detail'
        width={1100}
        open={openDetail}
        title={<div style={{ fontSize: 24, fontWeight: 500 }}>Chi tiết</div>}
        onOk={handleOk}
        onClose={handleCancel}
        footer={null}
      >
        {detail.id != 0 && <TrainingDetail data={detail} />}
      </Drawer>
      <div className='columns'>
        <div className='column ml-4 is-1 mr-6'>
          {listSemesters?.length > 0 && <Table columns={semesterColums} dataSource={listSemesters} pagination={false} />}

        </div>
        <div className='column'>
          {listData?.length > 0 && <TableCustom columns={columns} dataSource={listData}
            scroll={{ y: 'calc(100vh - 190px)' }} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }} />}
        </div>
      </div>
    </div><Footer /></>
  );
};

export default TrainingContainer;
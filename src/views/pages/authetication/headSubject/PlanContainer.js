import { Button, Select, Table, Drawer, Input, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import ModalPlanContainer from './ModalPlanContainer';
import ModalSlotContainer from './ModalSlotContainer';
import moment from 'moment';
import '../../styles/plan.css';
import { apiClient } from '../../../../api/api-client';
import { useNavigate, NavigationContainer } from 'react-router-dom';
import { openNotificationWithIcon } from '../../request/notification';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Header from '../Header';
import { TableCustom, CardCustom } from '../../helper/style-component';
import { DeleteOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";
const dataStatus = [
  {
    name: 'Đợi duyệt',
    backgroundColor: 'yellow',
    color: 'black',
    disabled: false
  },
  {
    name: 'Đã duyệt',
    backgroundColor: '#1677ff',
    color: 'black',
    disabled: true
  },
  {
    name: 'Từ chối',
    backgroundColor: '#ff4d4f',
    color: 'black',
    disabled: false
  }
]
const PlanContainer = () => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSlot, setOpenSlot] = useState(false);
  const [listPlan, setListPlan] = useState();
  const [listSemesters, setListSemesters] = useState();
  const [semesterId, setSemesterId] = useState(1);
  const userId = localStorage.getItem('userId');
  const [count, setCount] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [isDoneAccount, setIsDoneAccount] = useState(false);
  const [slot, setSlot] = useState([]);
  const [room, setRoom] = useState([]);
  const [subject, setSubject] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const campusId = localStorage.getItem('campusId');
  const [selectedRow, setSelectRow] = useState([]);
  const [status, setStatus] = useState({});
  const [planId, setPlanId] = useState();
  const [statusId, setStatusId] = useState(0);

  const [listSemestersOption, setListSemestersOption] = useState([]);
  // const [semesterNow, setSemesterNow] = useState(0);
  // const [, setSemesterNow] = useState(0);


  const _getStatusListPlan = async (id) => {
    const { data } = await apiClient.get(`/api/status-observation-plan?planId=${id}`)
    setStatus(dataStatus[data.items])
    setStatusId(data.items)

  }
  const getSemestersCurrent = async () => {
    const { data } = await apiClient.get(`/api/semester-current`)
    setSemesterId(data?.items)

  }
  const _requestData = async () => {
    console.log("planId",planId)
    // setSemesterId(semesterNow)
    const { data } = await apiClient.get(`/api/list-observation-slot?semesterId=${semesterId}&accountId=${userId}`)
    // localStorage.setItem("planId", data.items[0].planId);
    // _getStatusListPlan(localStorage.getItem("planId"))
    try {
      if (data.items != 0){
        setPlanId(data?.items[0].planId)
    _getStatusListPlan(data?.items[0].planId)
    console.log("listPlan111", statusId)
      }
    } catch {

    }
    data.items = data.items.map((item, idx) => {
      var date = new Date(`${item.slotTime}`);

      item.slotTime =
        ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
      let accountName1 = accounts.find(o => o.value == item.accountId1)?.name;
      var accountName2 = accounts.find(o => o.value == item.accountId2)?.name;
      var roomName = room.find(o => o.value == item.roomId)?.name;
      var subjectCode = subject.find(o => o.value == item.subjectId)?.name;
      var slotName = slot.find(o => o.value == item.slotId)?.name;
      return { ...item, accountName1: accountName1, accountName2: accountName2, roomName: roomName, subjectCode: subjectCode, slotName: slotName, key: item.id };
    })

    setListPlan(data.items);
  }
  const getSlot = async () => {
    const { data } = await apiClient.get('/api/slot-list')
    var rooms = data;
    rooms = rooms.map((item, idx) => {
      return { ...item, label: item.name }
    })
    setSlot(rooms);
  }

  const getSubjects = async () => {
    const { data } = await apiClient.get(`/api/subject-dropdown-list?id=${campusId}&code=`)
    var subjects = data;
    subjects = subjects.map((item, idx) => {
      return { ...item, label: item.name }
    })
    setSubject(subjects);
  }
  const getRooms = async () => {
    const { data } = await apiClient.get(`/api/room-dropdown-list?id=${campusId}&name=`)
    var rooms = data;
    rooms = rooms.map((item, idx) => {
      return { ...item, label: item.name }
    })
    setRoom(rooms);
  }
  const getAccounts = async () => {
    const { data } = await apiClient.get(`/api/list-account?id=${campusId}&email=`)
    var rooms = data;
    rooms = rooms.map((item, idx) => {
      return { ...item, label: item.name }
    })
    setAccounts(rooms);
    setIsDoneAccount(true)
  }
  const handleAccount1Change = (e, record) => {
    var values = { ...record, accountId1: e }
    setResult(values);
  }
  const handleAccount2Change = (e, record) => {
    var values = { ...record, accountId2: e }
    setResult(values);
  }
  const onDatePickerChange = (e, record) => {
    var date = new Date(e._d),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    var dateResult = [date.getFullYear(), mnth, day].join("-");
    var values = { ...record, slotTime: dateResult }
  
    setResult(values);
  }

  const getSemesters = async () => {
    const { data } = await apiClient.get('/api/semester-list')
    var rooms = data;
    rooms = rooms.map((item, idx) => {
      return { ...item, label: item.name }
    })
    var ReverseArray = [];
    var length = Object.keys(data).length;
    for (var i = length - 1; i >= 0; i--) {
      ReverseArray.push(data[i]);
      console.log("dataa", data[i])
    }
    setListSemesters(ReverseArray);
    setSemesterId(data.length)
    setListSemestersOption(rooms)

  }

  useEffect(() => {
    getSemesters();
    getSlot();
    getRooms();
    getSubjects();
    getAccounts();
    setIsDone(true)
    getSemestersCurrent()

  }, [])

  useEffect(() => {
    if (isDone & isDoneAccount) {
      _requestData();
      setCount(semesterId)
    }
  }, [semesterId, isDone, isDoneAccount])

  const showModal = () => {
    setOpen(true);
  };
  const showModalSlot = () => {
    setOpenSlot(true);
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
    setOpenSlot(false)
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Thời gian',
      dataIndex: 'slotTime',
      key: 'slotTime',
      render: (text, record, idx) => (
        isUpdate && idx == index ?
          <DatePicker style={{ width: "13rem" }} onChange={(e) => onDatePickerChange(e, record)} disabledDate={(current) => {
            return moment().add(-1, 'days') >= current
          }} />
          // <Select className='select-box' style={{ width: '100%' }} defaultValue={text} options={accounts} onChange={(e) => handleAccount1Change(e, record)} />
          : <div>{text}</div>
      ),
    },
    {
      title: 'Ca học',
      dataIndex: 'slotName',
      key: 'slotName',
      render: (text, record, idx) => (
        isUpdate && idx == index ?
          <Select className='select-box' style={{ width: '100%' }} defaultValue={text} options={slot} onChange={(e) => handleSlotChange(e, record)} />
          : <div>{text}</div>
      ),
      width: '10%'
    },
    {
      title: 'Phòng học',
      dataIndex: 'roomName',
      key: 'roomName',
      render: (text, record, idx) => (
        isUpdate && idx == index ?
          <Select className='select-box' style={{ width: '100%' }} defaultValue={text} options={room} onChange={(e) => handleRoomChange(e, record)} />
          : <div>{text}</div>
      ),
      width: '10%'

    },
    {
      title: 'Tên môn',
      dataIndex: 'subjectCode',
      key: 'subjectCode',
      render: (text, record, idx) => (
        isUpdate && idx == index ?
          <Select className='select-box' style={{ width: '100%' }} defaultValue={text} options={subject} onChange={(e) => handleSubjectChange(e, record)} />
          : <div>{text}</div>
      ),
      width: '10%'

    },
    // {
    //   title: 'Tên môn',
    //   dataIndex: 'subjectName',
    //   key: 'subjectName',

    // },
    {
      title: 'Lớp',
      dataIndex: 'className',
      key: 'className',
      width: '10%'
    },
    {
      title: 'Tên GV1',
      dataIndex: 'accountName1',
      key: 'accountName1',
      render: (text, record, idx) => (
        isUpdate && idx == index ?
          <Select className='select-box' style={{ width: '100%' }} defaultValue={text} options={accounts} onChange={(e) => handleAccount1Change(e, record)} />
          : <div>{text}</div>
      ),
    },
    {
      title: 'Tên GV2',
      dataIndex: 'accountName2',
      key: 'accountName2',
      render: (text, record, idx) => (
        isUpdate && idx == index ?
          <Select className='select-box' style={{ width: '100%' }} defaultValue={text} options={accounts} onChange={(e) => handleAccount2Change(e, record)} />
          : <div>{text}</div>
      ),
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Cập nhật',
      render: (text, record, idx) => (
        isUpdate && idx == index ?
          <Button  type="primary" variant="outlined" onClick={handleClickOpen}>
            Xác nhận
          </Button>
          :
          <Button type="primary" disabled={statusId!=1?false:true} onClick={() => updateSlot(record, idx)}>
            {"Cập nhật"}
          </Button>
      ),
    }, {
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
  const _handleDel = () => {
    const isBool = window.confirm("Bạn có muốn xoá không")
    if (isBool) {
      selectedRow.map(async (item) => {
        try {
          const { data } = await apiClient.post(`/api/delete-observation-slot?slotId=${item}`)
          openNotificationWithIcon("success", "Xoá thành công");
          _requestData();
        } catch (error) {
          openNotificationWithIcon("error", error.message)
        }
      })
    }
    setTimeout(() => {
      _requestData()
    }, 1000)
  }

  const [result, setResult] = useState({});
  const handleRoomChange = (e, record) => {
    var values = { roomId: e }
    setResult(values);
  }
  const handleSlotChange = (e, record) => {
    var values = { ...record, slotId: e }
    setResult(values);
  }
  const handleSubjectChange = (e, record) => {
    var values = { ...record, subjectId: e }
    setResult(values);
  }
  const handleClassChange = (e, record) => {
    var values = { ...record, className: e }
    setResult(values);
  }
  const [isUpdate, setIsUpdate] = useState(false);
  const [index, setIndex] = useState(-1);
  const updateSlot = (values, index) => {
    setIsUpdate(true);
    setIndex(index);
    setResult(values)
  }

  const postUpdateSlot = async () => {
    var values = {
      id: result.id,
      accountId: result.accountId,
      subjectId: result.subjectId,
      reason: result.reason,
      slotTime: result.slotTime,
      slotId: result.slotId,
      roomId: result.roomId,
      className: result.className,
      headTraining: parseInt(userId),
      headSubject: parseInt(userId),
      accountId1: result.accountId1,
      accountId2: result.accountId2,
    };
    handleClose();
    console.log("values",values)

    const { data } = await apiClient.post('/api/update-observation-slot', values)
    setDialogOpen(false);
    if (data.status == 200) {
      openNotificationWithIcon("success", "Cập nhật thành công")
      setIndex(-1);
      _requestData();
    }else if(data.status==400){
        openNotificationWithIcon("error", "Vui lòng nhập đầy đủ thông tin")
    } else {
      openNotificationWithIcon("error", "Thất bại")
    }

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
  const getResult = async (id) => {
    const { data } = await apiClient.get(`/api/list-observation-slot-plan?planId=${id}`)
    localStorage.setItem("result", data.items[0].result)

  }
  const handleNavigation = (record) => {
    navigation(`/head-plan/${record.id}`);
    getResult(record.id)

  }
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Header name1="Giảng viên" link1="/lecture" />
      <div className='plan-container'>
        <div className='modal-plan'>
          <Button disabled={planId==null?false:true}type="primary" onClick={showModal}>
            Tạo kế hoạch dự giờ
          </Button>
          <Drawer
            width={820}
            open={open}
            title={
              <div className='has-text-weight-bold is-size-4'>
                Tạo kế hoạch dự giờ
              </div>
            }
            onOk={handleOk}
            onClose={handleCancel}
            footer={null}
          >
            <ModalPlanContainer handleCancel={handleCancel} />
          </Drawer>
          <Drawer
            width={820}
            open={openSlot}
            title={
              <div className='has-text-weight-bold is-size-4'>
                Tạo slot
              </div>
            }
            onOk={handleOk}
            onClose={handleCancel}
            footer={null}
          >
            <ModalSlotContainer handleCancel={handleCancel} planId={planId} />
          </Drawer>
        </div>
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Xác nhận cập nhật"}
          </DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Huỷ bỏ</Button>
            <Button onClick={postUpdateSlot} autoFocus>
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
        <div className='columns'>
          <div className='column ml-4 is-1 mr-6'>
            {listSemesters?.length > 0 && <TableCustom columns={semesterColums} dataSource={listSemesters} pagination={false} />}
          </div>
          <div className='column' style={{ borderLeft: "1px solid black" }}>
            {listPlan?.length > 0 &&
              <CardCustom
                title={
                  <div style={{ display: 'flex', alignContent: 'center' }}>
                    <p style={{ marginRight: 20 }}>Chủ nhiệm bộ môn</p>
                    <Button onClick={() => postUpdateSlot()} disabled={status.disabled} style={{ background: status?.backgroundColor || 'blue', color: status.color }}>{status?.name || ''}</Button>
                  </div>
                }
                extra={<Extra
                  showDel={selectedRow && selectedRow[0]}
                  _onReload={_requestData}
                  _handleDel={selectedRow.length > 0 ? _handleDel : () => { }}
                  _onClickAdd={() => showModalSlot()}
                />}
              >
                <TableCustom
                  rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                      console.log(selectedRowKeys, selectedRows);
                      setSelectRow(selectedRowKeys)
                    }
                  }}
                  columns={columns}
                  dataSource={listPlan} /></CardCustom>}</div>
        </div>
      </div>
    </>
  );
};
export default PlanContainer;
const Extra = ({
  showDel = true,
  _handleDel = () => { },
  _onClickAdd = () => { },
  _onReload = () => { }
}) => {

  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingRight: 7, justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ display: 'flex' }}>
          <Button onClick={_onClickAdd} className="ro-custom" type="text" icon={<PlusOutlined />} >Thêm Slot</Button>
          {!showDel ? null : <Button onClick={_handleDel} className="ro-custom" type="text" icon={<DeleteOutlined />} >Xoá item đã chọn</Button>}
          <Button onClick={() => _onReload()} className="ro-custom" type="text" icon={<ReloadOutlined />} >Làm mới</Button>
        </div>
      </div>
    </div>
  )
}






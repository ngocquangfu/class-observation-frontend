import { Button, Form, Input, Table, Modal, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import '../../styles/lecture.css';
import { apiClient } from '../../../../api/api-client';
import { openNotificationWithIcon } from '../../request/notification';


const LectureDetailContainer = (props) => {
  const { record, onCancel } = props;
  const [form] = Form.useForm();
  const campusId = localStorage.getItem('campusId');
  const userId = localStorage.getItem('userId');
  const [listData, setListData] = useState();
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState({ "observationSlotId": record.id, "accountId": parseInt(userId) });
  const [observation, setObservation] = useState([]);
  const [dataInput, setDataInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [isReveview, setIsReveview] = useState(false);


  // const state = {
  //   buttonState: 2
  // };
  const onSubmit = async (fieldValues) => {
    //if (state.buttonState === 1) {
      showConfirm(fieldValues)
    //   console.log("Button 1 clicked!");
    // }
    // if (state.buttonState === 2) {
    //   console.log("Button 2 clicked!");
    //   onSaveDraft(fieldValues)
    // }
  };
  const onSaveDraft = async (fieldValues) => {
    const body = { ...fieldValues, ...values, "observationDetailRequests": observation };
    const { data } = await apiClient.post(`/api/lecture/create-observation-review`, body)
    localStorage.setItem("save draft", data)
    console.log("log112", body)
  }
  const { confirm } = Modal;

  const _requestData = async () => {
    const { data } = await apiClient.get(`/api/training/list-criteria-campus?id=${campusId}`)
    setListData(data.items);
  }

  const getDetailLecture = async () => {
    try {
      const { data } = await apiClient.get(`/api/lecture/view-evaluation-observation-review?slotId=${record.id}&accountId=${userId}`)
      if (parseInt(data.status) == 200) {
        setDataInput(data.items)
        setLoading(true);
        setIsReveview(true);
      }

    } catch(e){
      setDataInput({})


    }
  }

  useEffect(() => {
    _requestData();

  }, [])

  useEffect(() => {
    setDataInput({})
    getDetailLecture()
    setTimeout(() => {
      setLoading(true)
    }, 2000)
  }, [record.id])

  const columnsEnable = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên tiêu chí',
      dataIndex: 'criteriaName',
      key: 'criteriaName',
    },
    {
      title: 'Nhập điểm',
      render: (text, record, index) =>
        <Input type="number" max={4} min={1} onChange={(e) => onPointChange(record, e, index)} />
    },
  ]

  const columnsDisable = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên tiêu chí',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Nhập điểm',
      dataIndex: 'point',
      key: 'point',
      render: (text, record, index) =>
        <Input type="number" defaultValue={dataInput.listOfObservationDetail[index].point} max={4} min={1} onChange={(e) => onPointChange(record, e, index)} />
    },
  ]

  const onPointChange = (values, e, index) => {
    const record = { "code": values.criteriaCode, "name": values.criteriaName, "point": parseInt(e.target.value) }
    var data = [...observation];
    data[index] = record;
    setObservation(data);
  }

  function showConfirm(fieldValues) {
    confirm({
      title: 'Bạn đã chắc chắn nộp chưa?',
      async onOk() {
        try {
          const body = { ...fieldValues, ...values, "observationDetailRequests": observation };
          console.log("body", values)
          console.log("fieldValues", fieldValues)

          const { data } = await apiClient.post(`/api/lecture/create-observation-review`, body)
          if (data.status == '200') {
            openNotificationWithIcon("success", "Thêm thành công")
            setIndex(index + 1)
            onCancel()
            form.resetFields();
          }
        } catch (e) {
          openNotificationWithIcon("error", "Nộp thất bại")
        }
      },
      onCancel() { },
    });
  }

  const onFinish = async (fieldValues) => {
    showConfirm(fieldValues)
  };

  return (
    <div>
      {loading &&
        <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" initialValues={Object.keys(dataInput).length !== 0 && dataInput.constructor === Object ? dataInput : {}}>
          {record && <div>
            <div className='columns'>
              <div className='column is-8'>
                <div className='columns'>
                  <div className='column is-4'>
                    <p>Ngày dự giờ:</p>
                    <p>Địa điểm dự giờ:</p>
                  </div>
                  <div className='column'>
                    <p>{record.slotTime}</p>
                    <p>{record.roomName}</p>
                  </div>
                </div>
              </div>
              <div className='column'>
                <div className='columns'>
                  <div className='column'>
                    <p>Ca học:</p>
                    <p>Lớp học:</p>
                  </div>
                  <div className='column'>
                    <p>{record.slotName}</p>
                    <p>{record.className}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='columns'>
              <p className='column is-4'>Tên giảng viên được đánh giá:</p>
              <p className='column'>{record.lectureName}</p>
            </div>
            <div className='columns'>
              <div className='column'>
                <div className='columns'>
                  <div className='column is-3'>Môn học:</div>
                  <div className='column'>{record.subjectName}</div>
                </div>
              </div>
              <div className='column'>
                <div className='columns'>
                  <div className='column is-3'>Bộ môn:</div>
                  <div className='column'>{record.departmentName}</div>
                </div>
              </div>
            </div>

            <Form.Item
              label="Tên bài giảng"
              name="lessonName"
              rules={[
                {
                  required: true,
                  message: 'Missing lecture name',
                },
              ]}
            >
              <Input placeholder='Tên bài giảng' style={{ width: 390 }}/>

            </Form.Item>

            {listData?.length > 0 && <Table key={index} columns={Object.keys(dataInput).length !== 0 && dataInput.constructor === Object ? columnsDisable : columnsEnable} dataSource={Object.keys(dataInput).length !== 0 && dataInput.constructor === Object ? dataInput.listOfObservationDetail : listData} pagination={false} />}
            <h1 className='pt-4'>Ưu điểm</h1>
            <Form.Item
              name="advantage"
              rules={[
                {
                  required: true,
                  message: 'Trường hợp này là bắt buộc',
                },
              ]}
            >
              <TextArea rows={4} className="text-area-antd" style={{ width: 500 }} />
            </Form.Item>
            <h1 className='pt-4'>Nhược điểm</h1>
            <Form.Item
              name="disadvantage"
              rules={[
                {
                  required: true,
                  message: 'Trường hợp này là bắt buộc',
                },
              ]}
            >
              <TextArea rows={4} className="text-area-antd" style={{ width: 500 }}/>
            </Form.Item>
            <h1 className='pt-4'>Đánh giá chung</h1>
            <Form.Item
              name="comment"
              rules={[
                {
                  required: true,
                  message: 'Trường hợp này là bắt buộc',
                },
              ]}
            >
              <TextArea rows={4} className="text-area-antd" style={{ width: 500 }}/>
            </Form.Item>
            <div className='is-flex is-justify-content-end'>
              <Space wrap>
                <Button className='button mt-5 ml-6'  disabled={isReveview} htmlType="submit">
                  Submit
                </Button>
                <Button className='button mt-5 ml-6' disabled={isReveview} htmlType="submit" >
                  Save draft
                </Button>
              </Space>
            </div>
          </div>}
        </Form>
      }
    </div>
  );
};

export default LectureDetailContainer;
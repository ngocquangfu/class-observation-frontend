import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, DatePicker, Form, Input, Select, Space } from 'antd';
import '../../styles/plan.css';
import { apiClient } from '../../../../api/api-client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { openNotificationWithIcon } from '../../request/notification';

const ModalPlanContainer = ({ handleCancel }) => {
  const [form] = Form.useForm();
  const campusId = localStorage.getItem('campusId');
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  const [departmentValue, setDepartmentValue] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [semestersOption, setSemestersOption] = useState([]);
  const [semesterNow, setSemesterNow] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [slot, setSlot] = useState([]);


  const getDepartments = async () => {
    // const { data } = await apiClient.get(`/api/list-department?id=${campusId}&name=${searchText}`)
    return userId;
  }
  const getSemestersCurrent = async () => {
    const { data } = await apiClient.get(`/api/semester-current`)
    setSemesterNow(data.items)
  }

  const getSemesters = async () => {
    const { data } = await apiClient.get('/api/semester-list')
    var rooms = data;
    var ReverseArray = [];
    var length = Object.keys(data).length;
    for (var i = length - 1; i >= 0; i--) {
      ReverseArray.push(data[i]);
      console.log("dataa1", data[i])
    }
    rooms = rooms.map((item, idx) => {
      return { ...item, label: item.name }
    })
    setSemesters(ReverseArray);
    setSemestersOption(rooms)
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
    console.log("ssssss", subjects)
    setSubjectOptions(subjects);
  }
  const getRooms = async () => {
    const { data } = await apiClient.get(`/api/room-dropdown-list?id=${campusId}&name=`)
    var rooms = data;
    rooms = rooms.map((item, idx) => {
      return { ...item, label: item.name }
    })
    setRoomOptions(rooms);
  }
  const getAccounts = async () => {
    const { data } = await apiClient.get(`/api/list-account-lecture?id=1&email=`)
    var rooms = data;
    rooms = rooms.map((item, idx) => {
      return { ...item, label: item.name }
    })
    setAccounts(rooms);
  }

  useEffect(() => {
    getSubjects();
    getSemestersCurrent();
    getRooms();
    getSemesters();
    getAccounts();
    getSlot();
  }, [])


  // const onDepartmentSearch = async (searchText) => {
  //   const { data } = await apiClient.get(`/api/list-department?id=${campusId}&name=${searchText}`)
  //   const searchData = [];
  //   if (!searchText) {
  //     searchData = [];
  //   }
  //   if (data && data.length > 0) {
  //     for (let i = 0; i < data.length; i++) {
  //       searchData.push({ value: data[i].name })
  //     }
  //   }
  //   setDepartmentOptions(
  //     !searchText ? [] : searchData,
  //   );
  // };

  const onFinish = (fieldValues) => {
    var observationSlotsRequest = fieldValues.observationSlotsRequest;
    observationSlotsRequest = observationSlotsRequest.map((item) => {
      var date = new Date(item.slotTime._d),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      var dateResult = [date.getFullYear(), mnth, day].join("-");
      console.log("accountId", item.accountId1)
      return {
        ...item,
        headSubject: parseInt(userId),
        slotTime: dateResult,
        headTraining: parseInt(userId),
        accountId: parseInt(item.accountId),
        accountId1: parseInt(item.accountId1),
        accountId2: parseInt(item.accountId2),
        planStatus:null
      }
    })

    var values = {
      ...fieldValues,
      "observationSlotsRequest": observationSlotsRequest
    }
    var department = getDepartments();
    department.then(function () {
      const finalValues = {
        ...values,
        "campusId": parseInt(campusId),
        "accountId": parseInt(userId),
        "semesterId": semesterNow,

      }
      console.log("finalValues", finalValues)
      postPlan(finalValues);
    })
  };

  const postPlan = async (values) => {
    const { data } = await apiClient.post(`/api/create-observation-plan`, values)
    if (data.status == 200) {
      openNotificationWithIcon("success", "Tạo mới thành công")
      handleCancel()
      form.resetFields()
    } else {
      openNotificationWithIcon("error", "Thất bại")
    }
  }
  const handleChange = () => {
    form.setFieldsValue({
    });
  };
  const [array, setArray] = useState([0, 0, 0, 0]);
  const [options, setOptions] = useState([]);
  const onAccountSearch = async (searchText) => {
    const { data } = await apiClient.get(`/api/list-account-lecture?id=1&email=${searchText}`)
    const searchData = [];
    if (!searchText) {
      searchData = [];
    }
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        searchData.push({ label: data[i].name, value: data[i].name })
      }
    }
    setOptions(
      !searchText ? [] : searchData,
    );
  };
  const onSubjectSearch = async (searchText) => {
    const { data } = await apiClient.get(`/api/subject-dropdown-list?id=${campusId}&code=${searchText}`)
    const searchData = [];
    if (!searchText) {
      searchData = [];
    }
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        searchData.push({ label: data[i].name, value: data[i].value })

      }
    }
    setOptions(
      !searchText ? [] : searchData,
    );
  };
  const onSelect = (value, index) => {
    const list = [...array];
    list[index] = value;
    setArray(list);
    setOptions([])
  };

  return (
    <div>
      <div className='form-container'>
        <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
          {/* <div className='form-util'>
            <Form.Item
              name="semesterId"
              label="Semester"
              rules={[
                {
                  required: true,
                  message: 'Missing semester',
                },
              ]}
            >
              <Select className='select-box' options={semestersOption} onChange={handleChange} />
            </Form.Item>
            
          </div> */}
          <Form.List name="observationSlotsRequest">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div className='form-detail pl-4' key={index}>
                    <Space key={field.key} align="start">
                      <div className='form-slot'>
                        <div className='columns mt-4 '>

                          <div className='column is-flex is-justify-content-end'>

                            <Form.Item
                              shouldUpdate={(prevValues, curValues) =>
                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                              }
                            >
                              {() => (
                                <Form.Item
                                  {...field}
                                  label="Giảng viên"
                                  name={[field.name, 'accountId']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Trường hợp bắt buộc',
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(rule, value) {
                                        if (array.filter(item => item == value).length > 1) {
                                          return Promise.reject("Không được trùng");
                                        } else return Promise.resolve()
                                      }
                                    })
                                  ]}
                                >
                                  <Select
                                    showSearch
                                    options={accounts}
                                    style={{
                                      width: 200,
                                      marginLeft:5
                                    }}
                                    onSearch={onAccountSearch}
                                    onSelect={(value) => onSelect(value, 0)}
                                    onChange={handleChange}
                                    placeholder="Nhập"
                                    filterOption={(input, option) =>
                                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                  />
                                  {/* <Select className='select-box' options={accounts} onChange={handleChange} /> */}
                                </Form.Item>


                              )}
                            </Form.Item>
                          </div>

                          <div className='column is-flex is-justify-content-end'>
                            <Form.Item
                              shouldUpdate={(prevValues, curValues) =>
                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                              }
                            >
                              {() => (
                                <Form.Item
                                  {...field}
                                  label="Môn học"

                                  name={[field.name, 'subjectId']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Trường hợp bắt buộc',
                                    },
                                  ]}
                                >
                                  <Select
                                    options={subjectOptions}
                                    style={{
                                      width: "520px",
                                      marginLeft:20
                                    }}
                                    showSearch
                                    onSearch={onSubjectSearch}
                                    onChange={handleChange}
                                    placeholder="Nhập"
                                    filterOption={(input, option) =>
                                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    onSelect={(value) => onSelect(value, 0)}

                                  />
                                  {/* <Select className='select-box' options={subjectOptions} onChange={handleChange} /> */}

                                </Form.Item>
                              )}
                            </Form.Item>
                          </div>
                        </div>



                        <div className='columns'>
                          <div className='column is-flex is-justify-content-end'>
                            <Form.Item
                              shouldUpdate={(prevValues, curValues) =>
                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                              }
                            >
                              {() => (
                                <Form.Item
                                  {...field}
                                  label="Slot"
                                  name={[field.name, 'slotId']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Trường hợp bắt buộc',
                                    },
                                  ]}
                                >
                                  <Select className='select-box' options={slot} onChange={handleChange} style={{
                                      width: 200,
                                      marginLeft:47
                                    }}/>
                                </Form.Item>
                              )}
                            </Form.Item>
                          </div>
                          <div className='column is-flex is-justify-content-end'>
                            <Form.Item
                              {...field}
                              label="Thời gian"
                              name={[field.name, 'slotTime']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Trường hợp bắt buộc',
                                },
                              ]}
                            >
                              <DatePicker style={{ width: "13rem",width: 200,
                                      marginLeft:15 }} disabledDate={(current) => {
                                return moment().add(-1, 'days') >= current
                              }} />
                            </Form.Item>
                          </div>
                        </div>


                        <div className='columns'>
                          <div className='column is-flex is-justify-content-end'>

                            <Form.Item
                              {...field}
                              label="Phòng"
                              name={[field.name, 'roomId']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Trường hợp bắt buộc',
                                },
                              ]}
                            >
                              <Select className='select-box' options={roomOptions} onChange={handleChange} style={{
                                      width: 200,
                                      marginLeft:32
                                    }} />

                            </Form.Item>
                          </div>
                          <div className='column is-flex is-justify-content-end'>
                            <Form.Item
                              {...field}
                              label="Lớp"
                              name={[field.name, 'className']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Trường hợp bắt buộc',
                                },
                              ]}
                            >
                              <Input style={{ width: "13rem", width: 200,
                                      marginLeft:48 }} />
                            </Form.Item>
                          </div>
                        </div>


                        <div className='columns pt-4'>
                          <div className='column is-flex is-justify-content-end'>
                            <Form.Item
                              shouldUpdate={(prevValues, curValues) =>
                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                              }
                            >
                              {() => (
                                <Form.Item
                                  {...field}
                                  label="Giảng viên 1"
                                  name={[field.name, 'accountId1']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Trường hợp bắt buộc',
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(rule, value) {
                                        if (array.filter(item => item == value).length > 1) {
                                          return Promise.reject("Không được trùng");
                                        } else return Promise.resolve()
                                      }
                                    })
                                  ]}
                                >
                                  <Select
                                    options={accounts}
                                    showSearch
                                    style={{
                                      width: 200,
                                    }}
                                    onSearch={onAccountSearch}
                                    onSelect={(value) => onSelect(value, 1)}
                                    onChange={handleChange}
                                    placeholder="Nhập"
                                    filterOption={(input, option) =>
                                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                  />
                                  {/* <Select className='select-box' options={accounts} onChange={handleChange} /> */}
                                </Form.Item>
                              )}
                            </Form.Item>
                          </div>
                          <div className='column is-flex is-justify-content-end'>

                            <Form.Item
                              shouldUpdate={(prevValues, curValues) =>
                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                              }
                            >
                              {() => (
                                <Form.Item
                                  {...field}
                                  label="Giảng viên 2"
                                  name={[field.name, 'accountId2']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Trường hợp bắt buộc',
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(rule, value) {
                                        if (array.filter(item => item == value).length > 1) {
                                          return Promise.reject("Không được trùng");
                                        } else return Promise.resolve()
                                      }
                                    })
                                  ]}
                                >
                                  <Select
                                    showSearch
                                    options={accounts}
                                    style={{
                                      width: 200,
                                    }}
                                    onSearch={onAccountSearch}
                                    onSelect={(value) => onSelect(value, 2)}
                                    onChange={handleChange}
                                    placeholder="Nhập"
                                    filterOption={(input, option) =>
                                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                  />
                                  {/* <Select className='select-box' options={accounts} onChange={handleChange} /> */}
                                </Form.Item>
                              )}
                            </Form.Item>
                          </div>
                        </div>

                        <div className=''>
                          <Form.Item
                            {...field}
                            label="Lý do"
                            name={[field.name, 'reason']}
                            rules={[
                              {
                                required: true,
                                message: 'Trường hợp bắt buộc',
                              },
                            ]}
                          >
                            <Input style={{
                                      width: "520px",
                                      marginLeft:47
                                    }}/>
                          </Form.Item>

                          <Form.Item
                            shouldUpdate={(prevValues, curValues) =>
                              prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                            }
                          >
                          </Form.Item>
                        </div>
                      </div>


                      <div className='button-remove'>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </div>
                    </Space>
                  </div>
                ))}

                <Form.Item className='button-add'>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item className='button-submit'>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }} >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ModalPlanContainer;
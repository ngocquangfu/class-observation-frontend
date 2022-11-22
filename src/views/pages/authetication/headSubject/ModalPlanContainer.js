import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {AutoComplete, Button, DatePicker, Form, Input, Select, Space } from 'antd';
import '../../styles/plan.css';
import { apiClient } from '../../../../api/api-client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
const { Option } = Select;

const ModalPlanContainer = () => {
  const [form] = Form.useForm();
  const campusId = localStorage.getItem('campusId');
  const userId = localStorage.getItem('userId');
  const [departmentValue, setDepartmentValue] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [slot, setSlot] = useState([]);

  const getDepartments = async (searchText) => {
    const {data} = await apiClient.get(`/api/list-department?id=${campusId}&name=${searchText}`)
    return data[0].value;
  }

  const getSemesters = async () => {
    const {data} = await apiClient.get('/api/semester-list')
    var subjects = data;
    subjects = subjects.map((item, idx) => {
      return {...item, label: item.name}
    })
    setSemesters(subjects);
  }
  const getSlot = async () => {
    const {data} = await apiClient.get('/api/slot-list')
    var slots = data;
    slots = slots.map((item, idx) => {
      return {...item, label: item.name}
    })
    setSlot(slots);
  }
  const getSubjects = async () => {
    const {data} = await apiClient.get(`/api/subject-dropdown-list?id=${campusId}&code=`)
    var subjects = data;
    subjects = subjects.map((item, idx) => {
      return {...item, label: item.name}
    })
    setSubjectOptions(subjects);
  }
  const getRooms = async () => {
    const {data} = await apiClient.get(`/api/room-dropdown-list?id=${campusId}&name=`)
    var rooms = data;
    rooms = rooms.map((item, idx) => {
      return {...item, label: item.name}
    })
    setRoomOptions(rooms);
  }
  const getAccounts = async () => {
    const {data} = await apiClient.get(`/api/list-account?id=${campusId}&email=`)
    var rooms = data;
    rooms = rooms.map((item, idx) => {
      return {...item, label: item.name}
    })
    setAccounts(rooms);
  }

  useEffect(() => {
    getSubjects();
    getRooms();
    getSemesters();
    getAccounts();
    getSlot();
  }, [])  
  
  
  const onDepartmentSearch = async (searchText) => {
    const {data} = await apiClient.get(`/api/list-department?id=${campusId}&name=${searchText}`)
    const searchData = [];
    if (!searchText) {
      searchData = [];
    }
    if(data && data.length > 0){
      for(let i = 0; i < data.length; i++){
        searchData.push({value: data[i].name})
      }
    }
    setDepartmentOptions(
      !searchText ? [] : searchData,
    );
  };

  const onFinish = (fieldValues) => {
    var observationSlotsRequest = fieldValues.observationSlotsRequest;
    observationSlotsRequest = observationSlotsRequest.map((item) => {
      var date = new Date(item.slotTime._d),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      var dateResult = [date.getFullYear(), mnth, day].join("-");
      return {...item, headSubject: userId, slotTime: dateResult}
    })
    var values = {
      ...fieldValues,
      "observationSlotsRequest": observationSlotsRequest
    }
    var department = getDepartments(fieldValues.departmentId);
    department.then(function(result) {
      const finalValues = {
        ...values,
        "campusId": parseInt(campusId),
        "departmentId": result,
      }
      postPlan(finalValues);
      console.log("valuesssssssssssss: ", finalValues);
    })
  };

  const postPlan = (values) => {
    apiClient.post(`/api/create-observation-plan`, values)
  }
  const handleChange = () => {
    form.setFieldsValue({
    });
  };
  const [array, setArray] = useState([0, 0, 0, 0]);
  const [options, setOptions] = useState([]);
  const onAccountSearch = async (searchText) => {
    const {data} = await apiClient.get(`/api/list-account?id=${campusId}&email=${searchText}`)
    const searchData = [];
    if (!searchText) {
      searchData = [];
    }
    if(data && data.length > 0){
      for(let i = 0; i < data.length; i++){
        searchData.push({label: data[i].name, value: data[i].name})

      }
    }
    setOptions(
      !searchText ? [] : searchData,
    );
  };
  const onSubjectSearch = async (searchText) => {
    const {data} = await apiClient.get(`/api/subject-dropdown-list?id=${campusId}&code=${searchText}`)
    const searchData = [];
    if (!searchText) {
      searchData = [];
    }
    if(data && data.length > 0){
      for(let i = 0; i < data.length; i++){
        searchData.push({label: data[i].name, value: data[i].name})

      }
    }
    setOptions(
      !searchText ? [] : searchData,
    );
  };
  const onSelect = (value, index) => {
    const list = [...array];
    list[index] = value.name;
    setArray(list);
  };
  
  return (
    <div>
    <div className='form-container'>
    <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <div className='form-util'>
        <Form.Item
          name="semesterId"
          label="Kỳ"
          rules={[
            {
              required: true,
              message: 'Trường hợp này là bát buộc',

            },
          ]}
        >
          <Select className='select-box' options={semesters} onChange={handleChange} />
        </Form.Item>
        <Form.Item
          name="departmentId"
          label="Phòng ban"
          rules={[
            {
              required: true,
              message: 'Trường hợp này là bát buộc',

            },
          ]}
        >
          <AutoComplete
            options={departmentOptions}
            value={departmentValue}
            style={{
              width: 200,
            }}
            onSearch={onDepartmentSearch}
          />
        </Form.Item>
      </div>
      <Form.List name="observationSlotsRequest">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div className='form-detail' key={index}>
              <Space key={field.key} align="start">
                <div className='form-slot'>
                  <div className='form-util'>
                    <Form.Item
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                      }
                    >
                      {() => (
                        <Form.Item
                          {...field}
                          label="Giảng Viên:"
                          name={[field.name, 'name']}
                          rules={[
                            {
                              required: true,
                              message: 'Trường hợp này là bát buộc',
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (array.filter(item => item == value).length > 1) {
                                  return Promise.reject("Không được trùng");
                                } 
                              }
                            })
                          ]}
                          >
                            <AutoComplete
                              options={options}
                              style={{
                                width: 200,
                              }}
                              onSearch={onAccountSearch}
                              onSelect={(value) => onSelect(value, 0)}
                              onChange={handleChange}
                            />
                        </Form.Item>
                      )}
                    </Form.Item>

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
                              message: 'Trường hợp này là bát buộc',
                            },
                          ]}
                          >
                            <AutoComplete
                              options={options}
                              style={{
                                width: 200,
                              }}
                              onSearch={onSubjectSearch}
                              onChange={handleChange}
                            />
                          
                        </Form.Item>
                      )}
                    </Form.Item>
                 </div>

                  

                  <div className='form-util'>
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
                              message: 'Trường hợp này là bát buộc',
                            },
                          ]}
                          >
                          <Select className='select-box' options={slot} onChange={handleChange} />
                        </Form.Item>
                      )}
                    </Form.Item>

                    <Form.Item
                    {...field}
                    label="Ngày"
                    name={[field.name, 'slotTime']}
                    rules={[
                      {
                        required: true,
                        message: 'Trường hợp này là bát buộc',
                      },
                    ]}
                  >
                    <DatePicker disabledDate={(current) => {
                      return moment().add(-1, 'days')  >= current 
                      }}/>
                  </Form.Item> 
                    
                 </div>


                  <div className='form-util'>
                    <Form.Item
                      {...field}
                      label="Phòng"
                      name={[field.name, 'roomId']}
                      rules={[
                        {
                          required: true,
                          message: 'Trường hợp này là bát buộc',
                        },
                      ]}
                    >
                          <Select className='select-box' options={roomOptions} onChange={handleChange} />

                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Class Name"
                      name={[field.name, 'className']}
                      rules={[
                        {
                          required: true,
                          message: 'Trường hợp này là bát buộc',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>


                  <div className='form-util'>
                    <Form.Item
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                      }
                    >
                      {() => (
                        <Form.Item
                          {...field}
                          label="Giẳng viên 1"
                          name={[field.name, 'accountId1']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing sight',
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (array.filter(item => item == value).length > 1) {
                                  return Promise.reject("Không được trùng");
                                } 
                              }
                            })
                          ]}
                          >
                            <AutoComplete
                              options={options}
                              style={{
                                width: 200,
                              }}
                              onSearch={onAccountSearch}
                              onSelect={(value) => onSelect(value, 1)}
                              onChange={handleChange}
                            />
                        </Form.Item>
                      )}
                    </Form.Item>

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
                              message: 'Trường hợp này là bát buộc',
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (array.filter(item => item == value).length > 1) {
                                  return Promise.reject("Không được trùng");
                                } 
                              }
                            })
                          ]}
                          >
                            <AutoComplete
                              options={options}
                              style={{
                                width: 200,
                              }}
                              onSearch={onAccountSearch}
                              onSelect={(value) => onSelect(value, 2)}
                              onChange={handleChange}
                            />
                        </Form.Item>
                      )}
                    </Form.Item>
                 </div>
                  
                  <div className='form-util'>
                    <Form.Item
                        {...field}
                        label="Lý do"
                        name={[field.name, 'reason']}
                        rules={[
                          {
                            required: true,
                            message: 'Trường hợp này là bát buộc',
                          },
                        ]}
                        >
                        <Input />
                      </Form.Item>

                      <Form.Item
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                      }
                      >
                      {() => (
                        <Form.Item
                        {...field}
                        label="Trưởng ban"
                        name={[field.name , 'headTraining']}
                        rules={[
                          {
                              required: true,
                              message: 'Trường hợp này là bát buộc',
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (array.filter(item => item == value).length > 1) {
                                  return Promise.reject("Không được trùng");
                                } 
                              }
                            })
                          ]}
                          >
                            <AutoComplete
                              options={options}
                              style={{
                                width: 200,
                              }}
                              onSelect={(value) => onSelect(value, 3)}
                              onSearch={onAccountSearch}
                              onChange={handleChange}
                            />
                        </Form.Item>
                      )}
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
        <Button type="primary" htmlType="submit" style={{width: "100%"}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};
export default ModalPlanContainer;
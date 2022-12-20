import React, { useState, useEffect } from 'react';
import { Checkbox, Form, Input, Select, AutoComplete } from 'antd';
import { apiClient } from '../../../../../api/api-client';
const { Option } = Select;
export const RenderForm = ({ jsonFrom = () => { } }) => {
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [departmentValue , setDepartmentValue] = useState('');
    const _requestDataDepartment = async (searchText = '') => {
        const campusId = localStorage.getItem("campusId");
        const { data } = await apiClient.get(`/api/list-department?id=${campusId}&name=${searchText}`)
        const searchData = [];
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                searchData.push({ value: data[i].name })
            }
        }
        setDepartmentOptions(
            data.map(item => {
                return {
                    value: item.name,
                    key: item.value
                }
            }),
        );
    }
    
    useEffect(() => {
        _requestDataDepartment()
    }, [])
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}> {
            jsonFrom.map((item, index) => {
                if (item.type === "select") {
                    return (
                        <Form.Item
                            key={String(index)}
                            name={item.name}
                            label={item.label}

                            style={item.hidden ? { display: 'none' } : { margin: '0', width: '45%' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường hợp bắt buộc',
                                },
                            ]}
                        >
                            <Select placeholder="Vui lòng chọn">
                                {
                                    item.data.map(i => {
                                        return <Option key={i.value} value={i.value}>{i.label}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    )
                }
                if (item.type == 'checkbox') {
                    return (
                        <Form.Item
                            key={String(index)}
                            name={item.name}
                            valuePropName="checked"
                            style={item.hidden ? { display: 'none' } : { margin: '0', width: '45%', marginTop: 25 }}
                        >
                            <Checkbox>{item.label}</Checkbox>
                        </Form.Item>)
                }
                if (item.type == "department") {
                    return (
                        <Form.Item
                            key={String(index)}
                            name={item.name}
                            label={item.label}
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường hợp bắt buộc',
                                },
                            ]}
                            style={item.hidden ? { display: 'none' } : { margin: '0', width: '45%' }}
                        >
                            <Select
                                options={departmentOptions}
                                style={{
                                    width: 200,
                                }}
                                onSearch={_requestDataDepartment}
                                placeholder="Bộ môn"
                            />
                        </Form.Item>
                    )
                }

                return (
                    <Form.Item
                        key={String(index)}
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                        style={item.hidden ? { display: 'none' } : { margin: '0', width: '45%' }}>
                        <Input disabled={item.disabled} />
                    </Form.Item>
                )
            })
        }
        </div>)

}

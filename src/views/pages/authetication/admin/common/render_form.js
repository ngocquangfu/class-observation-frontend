import React from 'react';
import { Form, Input, Select} from 'antd';

const { Option } = Select;
export const RenderForm = ({ jsonFrom = () => { } }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}> {
            jsonFrom.map((item, index) => {
                if (item.type === "select") {
                    return (
                        <Form.Item
                            key={String(index)}
                            name={item.name}
                            label={item.label}
                            rules={item.rules}
                            style={item.hidden ? { display: 'none' } : { margin: '0', width: '45%' }}>
                            <Select placeholder="Chọn Campus">
                                {
                                    item.data.map(i => {
                                        return <Option key={i.value} value={i.value}>{i.label}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    )
                }
                return (
                    <Form.Item
                        key={String(index)}
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                        xx={item.xx}
                        style={item.hidden ? { display: 'none' } : { margin: '0', width: '45%' }}>
                        <Input disabled={item.disabled}/>
                    </Form.Item>
                )
            })
        }
        </div>)

}

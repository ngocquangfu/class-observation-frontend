import React, { useState, useEffect, useCallback } from 'react';
import { Button, Checkbox, Input, Space, Upload } from "antd";
import { PlusOutlined, DeleteOutlined, ReloadOutlined, UploadOutlined } from "@ant-design/icons";
import { CardCustom, TableCustom } from '../../../helper/style-component'
import { apiClient } from '../../../../../api/api-client';
import AddNewForm from '../common/com//add_new_modal';
import ModalFormDetail from '../common/com/detail_modal'
import { openNotificationWithIcon } from '../../../request/notification';
import { debounce } from '@mui/material';
const { Search } = Input;

const AdminLecture = () => {
    const [selectedRow, setSelectRow] = useState([]);
    const [dataTable, setDataTable] = useState([])
    const [total] = useState(10)
    const [listCampus, setListCampus] = React.useState([])

    const [formAdd, setFormAdd] = React.useState(
        [
            {
                name: 'userName',
                label: 'Tên',
                rules: [
                    {
                        required: true,
                        message: 'Vui lòng nhập tên',
                    }]

            },
            {
                name: 'email',
                label: "Email",
                rules: [
                    {
                        required: true,
                        message: 'Vui lòng nhập email',
                    },
                    {
                        pattern: new RegExp(/^[a-z0-9]*@(fpt.edu.vn)$/),
                        message: "Vui lòng nhập email chữ thường và đuôi @fpt.edu.vn"
                    }
                ]

            },
            {
                name: 'campusId',
                label: 'Cơ Sở',
                data: [],
                type: 'select'
            },
            {
                name: 'trainingPro',
                label: 'Trưởng ban HO',
                type: 'checkbox'
            }
        ]
    )
    const [page, setPage] = useState({
        current: 1,
        number_of_page: 5
    })
    const [showAddNew, setShowAddNew] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const _handleChangePage = (page, number_of_page) => {
        console.log(page, number_of_page);
        setPage({
            current: page,
            number_of_page: number_of_page
        })
    };
    const _requestData = async () => {
        const { data } = await apiClient.get('/api/campus-dropdown-list')
        const convertData = data.map((i, idx) => {
            return {
                value: i.value,
                label: i.name,
            }
        })
        setListCampus(convertData)

        const convertDataFormAdd = formAdd.map(i => {
            if (i.type == "select") {
                return {
                    ...i,
                    data: convertData,
                }
            }
            else {
                return i
            }

        })
        setFormAdd(convertDataFormAdd)


    }
    const onChangeSearch = (e) => {
        debounceReqData(e);
    }
    const debounceReqData = useCallback(debounce((nextValue) => _requestDataTable(nextValue), 1000), [])
    const _requestDataTable = async (search = "") => {
        const start = page.current === 1 ? 0 : page.current * page.number_of_page - page.number_of_page
        const end = page.current * page.number_of_page
        const dataRole3 = await apiClient.get(`/api/admin/list-account-role?roleId=3&email=${search}&start=${start}&end=${end}`)
        const dataRole5 = await apiClient.get(`/api/admin/list-account-role?roleId=5&email=${search}&start=${start}&end=${end}`)
        const convertData = [...dataRole3.data.items.map(item => {
            return {
                key: item.id,
                ...item
            }
        }),
        ...dataRole5.data.items.map(item => {
            return {
                key: item.id,
                trainingPro: true,
                ...item
            }
        })
        ]
        setDataTable(convertData)
    }
    const _handleDel = () => {
        const isBool = window.confirm("Bạn muốn vô hiệu tài khoản?")
        if (isBool) {
            selectedRow.map(async (item) => {
                try {
                    const { data } = await apiClient.post(`/api/admin/delete-account?id=${item}`)
                    openNotificationWithIcon("success", "Vô hiệu thành công");
                } catch (error) {
                    openNotificationWithIcon("error", error.message)
                }
            })
        }
        setTimeout(() => {
            _handleReset()
        }, 1000)
    }


    const _handleAddNew = async (value) => {
        const body = {
            userName: value.userName,
            email: value.email,
            campusId: value.campusId,
            roles: [
                {

                    id: value.trainingPro ? 5 : 3
                }
            ]
        }
        try {
            const { data } = await apiClient.post('/api/admin/new-account', body)
            openNotificationWithIcon("success", "Thêm thành công")
        } catch (error) {
            openNotificationWithIcon("error", "Email đã tồn tại trong hệ thống")

        }

    }
    const _handleUpdate = async (value) => {
        const body = {
            id: showDetail.data.id,
            userName: value.userName,
            email: value.email,
            campusId: value.campusId,
            roles: [
                {
                    id: value.trainingPro ? 5 : 3
                }
            ]
        }
        try {
            const { data } = await apiClient.post(`/api/admin/edit-account`, body)
            openNotificationWithIcon("success", "Sửa thành công")
        } catch (error) {
            openNotificationWithIcon("error", "Sửa thất bại")
        }

    }

    const _handleReset = () => {
        _requestDataTable()
    }
    useEffect(() => {
        _requestDataTable()
        _requestData()
    }, [page])
    return (
        <div style={{}}>
            <CardCustom
                title="Trưởng ban đào tạo"
                extra={<Extra
                    showDel={selectedRow && selectedRow[0]}
                    listColumn={[]}
                    _onChange={(e) => onChangeSearch(e)}
                    _onReload={_handleReset}
                    _handleDel={selectedRow.length > 0 ? _handleDel : () => { }}
                    _onClickAdd={() => setShowAddNew(true)}
                />}
            >
                <TableCustom
                    dataSource={dataTable}
                    columns={[
                        {
                            title: 'STT',
                            dataIndex: 'stt',
                            render: (text, record, index) => index + 1,
                        },
                        {
                            title: 'Tên',
                            dataIndex: 'userName',
                            key: 'userName',
                        },
                        {
                            title: 'Email',
                            dataIndex: 'email',
                            key: 'email',
                        },
                        {
                            title: 'Cơ sở',
                            dataIndex: 'campusName',
                            key: 'campusName',
                        }, ,
                        {
                            title: 'Trưởng ban HO',
                            dataIndex: 'trainingPro',
                            render: (_, record) => {
                                console.log("trương ho", record.trainingPro);

                                return <Checkbox disabled checked={record.trainingPro}></Checkbox>
                            },
                        },

                    ]}
                    scroll={{ y: 'calc(100vh - 190px)' }} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '15', '20'] }}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log(selectedRowKeys, selectedRows);
                            setSelectRow(selectedRowKeys)
                        }
                    }}
                    onRow={(r) => ({
                        onClick: () => {
                            setShowDetail({
                                data: {
                                    id: r.id,
                                    userName: r.userName,
                                    email: r.email,
                                    campusId: listCampus.find(i => i.label == r.campusName).value,
                                    trainingPro: r.trainingPro
                                }, type: "EDIT"
                            })
                        }
                    })}
                />

            </CardCustom>
            <AddNewForm
                formAdd={formAdd}
                setFormAdd={setFormAdd}
                visible={showAddNew} jsonFormInput={formAdd}
                _onClose={() => {
                    setShowAddNew(false)
                    setTimeout(() => {
                        _requestDataTable()
                    }, 1000)
                }}
                _onSubmit={_handleAddNew}
            />
            <ModalFormDetail
                visible={showDetail} jsonFormInput={formAdd}
                _onClose={() => {
                    setShowDetail(false)
                    setTimeout(() => {
                        _requestDataTable()
                    }, 1000)
                }}
                _onSubmit={_handleUpdate}
            />
        </div>

    );
};
const onSearch = (value) => console.log(value);
const Extra = ({
    showDel = true,
    _onChange = () => { },
    _handleDel = () => { },
    _onClickAdd = () => { },
    _onFilter = () => { },
    _onReload = () => { },
}) => {
    const [fileUpload, setFileUpload] = useState();
    const _handleSelectFile = useCallback(async (file, type) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        setFileUpload({ formData, type, name: file.name });

        return false;
    }, []);
    console.log(fileUpload);

    useEffect(() => {
        if (fileUpload && fileUpload.type) {
            if (fileUpload.type === 'new') {
                _handleUploadFile(fileUpload.formData)
                setFileUpload(null);
            }
            else {
                setFileUpload(null);
            }
        }
    }, fileUpload)
    const _handleUploadFile = (file) => {
        apiClient.post('/api/admin/upload-campus', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log("-----", res);
                openNotificationWithIcon('success', 'Tải dữ liệu lên thành công');

            })

            .catch(error => {
                if (error.response) {
                    console.log('error.response.data', error.response.data);
                    openNotificationWithIcon('error', 'Tải dữ liệu lên thất bại');
                }
            }
            )
            .catch((err) => {

            });

    }
    return (

        <div style={{ display: 'flex', alignItems: 'center', paddingRight: 7, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flex: 1 }}>
                <div style={{ display: 'flex' }}>
                    <Space direction="vertical">
                        <Search
                            placeholder="Tìm kiếm tài khoản"
                            onSearch={onSearch}
                            onChange={(e) => _onChange(e.target.value)}
                            style={{
                                width: 200,
                            }}
                        />
                    </Space>
                    <Upload className="ro-custom" fileList={[]} beforeUpload={file => {

                        _handleSelectFile(file, 'new'); return false;
                    }}>
                        <Button
                            type="text" icon={<UploadOutlined />}>Import</Button>
                    </Upload>
                    {!showDel ? null : <Button onClick={_handleDel} className="ro-custom" type="text" icon={<DeleteOutlined />} >Vô hiệu hóa tài khoản</Button>}
                    <Button onClick={() => _onReload()} className="ro-custom" type="text" icon={<ReloadOutlined />} >Làm mới</Button>
                    <Button onClick={_onClickAdd} className="ro-custom" type="text" icon={<PlusOutlined />} >Thêm</Button>
                </div>
            </div>
        </div>
    )
}

export default AdminLecture;
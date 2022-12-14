import React, { useState, useEffect } from 'react';
import { Button } from "antd";
import { PlusOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { CardCustom, TableCustom } from '../../../helper/style-component'
import { apiClient } from '../../../../../api/api-client';
import AddNewForm from '../common/com//add_new_modal';
import ModalFormDetail from '../common/com/detail_modal'
import { openNotificationWithIcon } from '../../../request/notification';

const AdminLecture = () => {
    const [selectedRow, setSelectRow] = useState([]);
    const [dataTable, setDataTable] = useState([])
    const [total, setTotal] = useState(10)
    const campusId = localStorage.getItem("campusId")
    const [listCampus, setListCampus] = React.useState([])
    const [listDepartment, setListDepartment] = React.useState([])
    const [formAdd, setFormAdd] = React.useState(
        [
            {
                name: 'userName',
                label: 'Tên'
            },
            {
                name: 'email',
                label: "Email"
            },
            {
                name: 'campusId',
                label: 'Cơ sở',
                data: [],
                type: 'select'
            },
            {
                name: 'department',
                label: 'Bộ môn',
                data: [],
                type: 'department'
            },
        ]
    )
    const [page, setPage] = useState({
        current: 1,
        number_of_page: 10
    })
    // modal
    const [showAddNew, setShowAddNew] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    const getListDepartment = async (campusId) => {
        const { data } = await apiClient.get(`/api/list-department?id=${campusId}&name=`)
        setListDepartment(data)
    }
    const _requestData = async () => {
        const { data } = await apiClient.get(`/api/campus-dropdown-list`)
        const convertData = data.map((i, idx) => {
            return {
                value: i.value,
                label: i.name
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
    const _requestDataTable = async () => {
        const start = page.current == 1 ? 0 : page.current * page.number_of_page - page.number_of_page
        const end = page.current * page.number_of_page
        const { data } = await apiClient.get(`/api/admin/list-account-role?roleId=2&start=${start}&end=${end}`)
        const convertData = data.items.map(item => {
            return {
                key: item.id,
                ...item
            }
        })
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
            departmentId: value.department,
            roles: [
                {
                    id: 2
                }
            ]
        }
        try {
            const { data } = await apiClient.post('/api/admin/new-account', body)
            console.log("body", body);

            openNotificationWithIcon("success", "Thêm thành công")
        } catch (error) {
            openNotificationWithIcon("error", "Thêm thất bại")

        }

    }
    const _handleUpdate = async (value) => {
        const body = {
            id: showDetail.data.id,
            userName: value.userName,
            email: value.email,
            campusId: value.campusId,
            departmentId: value.department,
            roles: [
                {
                    id: 2
                }
            ]
        }
        try {
            const { data } = await apiClient.post(`/api/admin/edit-account`, body)
            console.log("data", data);
            openNotificationWithIcon("success", "Sửa thanh công")
        } catch (error) {
            openNotificationWithIcon("error", "Sửa thất bại")
        }

    }

    const _handleReset = () => {
        _requestDataTable()
    }
    useEffect(() => {
        getListDepartment(campusId)
        _requestDataTable()
        _requestData()
    }, [page])
    return (
        <div style={{}}>
            <CardCustom
                title="Chủ nhiệm bộ môn"
                extra={<Extra
                    showDel={selectedRow && selectedRow[0]}
                    listColumn={[]}

                    _onReload={_handleReset}
                    _handleDel={selectedRow.length > 0 ? _handleDel : () => { }}
                    _onClickAdd={() => setShowAddNew(true)}
                // _onClickColumnShow={() => setShowColumn(true)}
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
                        },
                        {
                            title: 'Bộ môn',
                            dataIndex: 'departmentName',
                            key: 'departmentName',
                        },
                    ]}
                    scroll={{ y: 'calc(100vh - 190px)' }} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '15', '30'] }}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: (selectedRowKeys, selectedRows) => {
                            setSelectRow(selectedRowKeys)
                        }

                    }}
                    onRow={(r) => ({
                        onClick: () => {
                            console.log('r', r);
                            setShowDetail({
                                data: {
                                    id: r.id,
                                    userName: r.userName,
                                    email: r.email,
                                    campusId: listCampus.find(i => i.label == r.campusName).value,
                                }, type: "Sửa"
                            })
                        }
                    })}
                />

            </CardCustom>
            <AddNewForm
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

const Extra = ({
    showDel = true,

    _handleDel = () => { },
    _onClickAdd = () => { },
    _onFilter = () => { },
    _onReload = () => { },
    // _onClickColumnShow = () => { },
}) => {

    return (
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: 7, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flex: 1 }}>
                <div style={{ display: 'flex' }}>
                    {!showDel ? null : <Button onClick={_handleDel} className="ro-custom" type="text" icon={<DeleteOutlined />} >Vô hiệu hóa tài khoản</Button>}
                    <Button onClick={() => _onReload()} className="ro-custom" type="text" icon={<ReloadOutlined />} >Làm mới</Button>
                    <Button onClick={_onClickAdd} className="ro-custom" type="text" icon={<PlusOutlined />} >Thêm</Button>
                </div>
            </div>
        </div>
    )
}

export default AdminLecture;
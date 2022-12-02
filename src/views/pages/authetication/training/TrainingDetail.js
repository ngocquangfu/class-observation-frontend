import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../styles/train.css';
import { apiClient } from '../../../../api/api-client';

const TrainingDetail = (props) => {

  const {data} = props;
  const [listData, setListData] = useState();
  var planId = data ? data.id : '';

  const _requestData = async () => {
    const {data} = await apiClient.get(`/api/list-observation-slot-plan?planId=${planId}`)
    data.items = data.items.map((item, idx) => {
      var slotTime = new Date(`${item.slotTime}`);

        item.slotTime =
        ((slotTime.getMonth() > 8) ? (slotTime.getMonth() + 1) : ('0' + (slotTime.getMonth() + 1))) + '/' + ((slotTime.getDate() > 9) ? slotTime.getDate() : ('0' + slotTime.getDate())) + '/' + slotTime.getFullYear();
        return item;
    })
    setListData(data.items);
  }
  useEffect(() => {
    _requestData();
  }, [planId])
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'GV được đánh giá',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: 'slotTime',
      dataIndex: 'slotTime',
      key: 'slotTime',
    },
    {
      title: 'slot',
      dataIndex: 'slot',
      key: 'slot',
    },
    {
      title: 'roomName',
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'subjectName',
      dataIndex: 'subjectName',
      key: 'subjectName',
    },
    {
      title: 'className',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'result',
      dataIndex: 'result',
      key: 'result',
    }
   
  ];
  return (
    <div >
      {listData?.length > 0 ? <Table columns={columns} dataSource={listData} /> : <div style={{textAlign : 'center' , fontSize : 24}}>Không có bản ghi nào</div>}
    </div>
  );
};

export default TrainingDetail;
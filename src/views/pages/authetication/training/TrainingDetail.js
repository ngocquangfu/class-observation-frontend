import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../styles/train.css';
import { apiClient } from '../../../../api/api-client';

const TrainingDetail = (props) => {

  const { data } = props;
  const [listData, setListData] = useState();
  var planId = data ? data.id : '';

  const _requestData = async () => {
    const { data } = await apiClient.get(`/api/list-observation-slot-plan?planId=${planId}`)
    data.items = data.items.map((item, idx) => {
      var slotTime = new Date(`${item.slotTime}`);
      var result = item.result;
      item.slotTime =
        ((slotTime.getMonth() > 8) ? (slotTime.getMonth() + 1) : ('0' + (slotTime.getMonth() + 1))) + '/' + ((slotTime.getDate() > 9) ? slotTime.getDate() : ('0' + slotTime.getDate())) + '/' + slotTime.getFullYear();
      item.result = (result == 1 ? "Đạt" : result==0?"Chờ kết quả": "từ chối")
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
      title: 'Thời gian',
      dataIndex: 'slotTime',
      key: 'slotTime',
    },
    {
      title: 'Slot',
      dataIndex: 'slot',
      key: 'slot',
    },
    {
      title: 'Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'Môn',
      dataIndex: 'subjectName',
      key: 'subjectName',
    },
    {
      title: 'Lớp',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
    }

  ];
  return (
    <div >
      {listData?.length > 0 ? <Table columns={columns} dataSource={listData} /> : <div style={{ textAlign: 'center', fontSize: 24 }}>Không có bản ghi nào</div>}
    </div>
  );
};

export default TrainingDetail;
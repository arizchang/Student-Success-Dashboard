import React, { Component } from 'react'
import { Calendar,Table, Tag, Space  } from 'antd';
import './calender.css'
function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateFullCellRender(value) {
  var date = value._d.getDate();
  const listData = getListData(value);
  return (
    <div className="">
      { date}
    </div>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number111</span>
    </div>
  ) : null;
}


const columns = [
  {
    title: 'Shape',
    dataIndex: 'name',
    key: 'name',
    render: text => <div className={`color ${text}`}></div>,
  },
  {
    title: 'Incoming Events 1',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Incoming Events 2',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Incoming Events 3',
    key: 'tags',
    dataIndex: 'tags',
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export class calender extends Component {
  render() {
    return (
      <div>
        <Calendar dateFullCellRender={dateFullCellRender} monthCellRender={monthCellRender} />
        <div className="color_note">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    )
  }
}

export default calender

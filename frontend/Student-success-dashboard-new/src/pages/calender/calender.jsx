import React, { Component } from "react";
import { Calendar } from "antd";
import {  requestAssignments } from "../../api/api";
import "./calender.css";

function dateFullCellRender(value, assignmentDates) {
  let date = value._d.getDate();
  let nowTime = new Date(
    value._d.getFullYear(),
    value._d.getMonth(),
    value._d.getDate()
  ).getTime();

  return (
    <div className={`num ${assignmentDates[nowTime] && "note_color"}`}>
      {date}
    </div>
  );
}

export class calender extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    requestAssignments().then((res) => {
      let assignments = [];
      let assignmentDates = {};

      res.data.forEach((assignment, idx) => {
        if (assignment.length) {
          assignment.forEach((item) => {
            let date = new Date(item.due_at);
            item.idx = idx;
            item.date = date;
            assignments.push(item);

            let dayTime = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            ).getTime();

            assignmentDates[dayTime] = assignmentDates[dayTime] || [];
            assignmentDates[dayTime].push(item);
          });
        }
      });

      this.setState({
        assignments: assignments,
        assignmentDates: assignmentDates,
      });
    });
  }

  render() {
    let { assignmentDates } = this.state;
    let date = new Date();
    let startTime = new Date(date.getFullYear(), date.getMonth(), 1);
    let endTime = new Date(date.getFullYear(), date.getMonth() + 1, -1);

    // 提取本月数据
    let newAssignmentDates = [];

    for (const key in assignmentDates) {
      if (key > startTime && key < endTime) {
        assignmentDates[key].time = key;
        newAssignmentDates.push(assignmentDates[key]);
      }
    }

    // 获取日最大数据量
    let dayAssignmentNum = 0;
    for (const assignmentArr of newAssignmentDates) {
      if (assignmentArr.length > dayAssignmentNum) {
        dayAssignmentNum = assignmentArr.length;
      }
    }

    console.log(newAssignmentDates, dayAssignmentNum);

    newAssignmentDates.sort(function(a, b) {
      return (a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0);
    });

    return (
      <div>
        <div className="calendar">
          {this.state.assignments && (
            <Calendar
              dateFullCellRender={(value) =>
                dateFullCellRender(value, this.state.assignmentDates)
              }
              headerRender={() => null}
            />
          )}
        </div>
        <div className="color_note">
          {dayAssignmentNum && (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  {new Array(dayAssignmentNum).fill(1).map((v, i) => (
                    <th key={i}>Assignment {i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {newAssignmentDates.map((assignmentArr) => (
                  <tr>
                    <td>{new Date(Number(assignmentArr.time)).toDateString()}</td>
                    {
                      new Array(dayAssignmentNum).fill(1).map((v, i) => <td key={i}>{assignmentArr[i] && assignmentURL(assignmentArr[i].course_id, assignmentArr[i].id, assignmentArr[i].name)}</td>)
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

function assignmentURL(courseID, assignmentID, assignmentName){
  let url = "https://asu.instructure.com/courses/" + courseID + "/assignments/" + assignmentID;
  return <a href = {url}>{assignmentName}</a>
}

export default calender;

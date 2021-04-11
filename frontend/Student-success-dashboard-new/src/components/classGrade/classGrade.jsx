import React, { Component } from 'react'
import './classGrade.css'

export class classGrade extends Component {

  constructor(props){
    super(props);

  }
  render() {

    let course = this.props.data;
    let countWeight = 0;
    course.weights.forEach(weight =>{
      countWeight += weight.group_weight;
    })
    console.log(countWeight)
    console.log(course)
    return (
      <div className="class_grade">
          <div className="title">
            {course.name}
          </div>
          <div className="des">
            <div className="grade">
              <b>Grade - {course.grades.current_grade}</b>
              {/* <br />
              Assignment01 - 18/20 -  A
              <br />
              Homework02 - 20/20 -  A
              <br />
              Test1 - 48/50 - A */}
            </div>
            <div className="due_date">
              <div className="due_title"><b>Due Dates</b></div>
              <div className="due_time">HW - 1 Due: {course.end_at && new Date(course.end_at).toDateString()}</div>
            </div>
            <div className="group">
              <b>Group:</b><br />
              {
                course.weights.map(weight => <p>{weight.name} - </p>)
              }
              {/* Assignments -<br />
              Homework -<br />
              Exams - */}
            </div>
            <div className="weight">
              <b>Weight:</b> <br />
              {
                course.weights.map(weight => <p>{Number((weight.group_weight / countWeight * 100).toFixed(1))}%</p>)
              }
              {/* 35%<br />
              20%<br />
              45% */}
            </div>
          </div>
        </div>
    )
  }
}

export default classGrade

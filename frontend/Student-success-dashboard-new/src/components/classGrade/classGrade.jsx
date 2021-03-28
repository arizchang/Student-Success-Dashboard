import React, { Component } from 'react'
import './classGrade.css'

export class classGrade extends Component {
  render() {
    return (
      <div className="class_grade">
          <div className="title">
            CSE 230 - Computer Org/Assemb Lang Prog
          </div>
          <div className="des">
            <div className="grade">
              <b>Grade - A</b>
              <br />
              Assignment01 - 18/20 -  A
              <br />
              Homework02 - 20/20 -  A
              <br />
              Test1 - 48/50 - A
            </div>
            <div className="due_date">
              <div className="due_title"><b>Due Dates</b></div>
              <div className="due_time">HW - 1 Due: October 31 2020</div>
            </div>
            <div className="group">
              <b>Group:</b><br />
              Assignments -<br />
              Homework -<br />
              Exams -
            </div>
            <div className="weight">
              <b>Weight:</b> <br />
              35%<br />
              20%<br />
              45%
            </div>
          </div>
        </div>
    )
  }
}

export default classGrade

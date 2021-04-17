import React, { Component } from 'react'
import './classGrade.css'

export class classGrade extends Component {
  render() {

    let course = this.props.data;
    let countWeight = 0;
    course.weights.forEach(weight =>{
      countWeight += weight.group_weight;
    })
    console.log(course,11111)
    return (
      <div className="class_grade">
          <div className="title">
          {courseURL(course.id, course.name)}
          </div>
          <div className="des">
            <div className="grade">
              <b>Grade - {course.grades.current_grade}</b>
            </div>
            <div className="due_date">
              <div className="due_title"><b>Due Dates</b></div>
              <div className="due_time">{course.assignments[0].due_at && new Date(course.assignments[0].due_at).toDateString()} : {course.assignments[0].name}</div>
            </div>
            <div className="group">
              <b>Group:</b><br />
              {
                course.weights.map(weight => <p>{weight.name} - </p>)
              }
            </div>
            <div className="weight">
              <b>Weight:</b> <br />
              {
                course.weights.map(weight => <p>{Number((weight.group_weight / countWeight * 100).toFixed(1))}%</p>)
              }
            </div>
          </div>
        </div>
    )
  }
}

function courseURL(courseID, courseName){
  let url = "https://asu.instructure.com/courses/" + courseID;
  return <a href = {url}>{courseName}</a>
}

export default classGrade

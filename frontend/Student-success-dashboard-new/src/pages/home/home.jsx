import React, { Component } from 'react'
import ClassGrade from '../../components/classGrade/classGrade'
import Announcements from '../../components/announcements/announcements'
import {requestCourses} from '../../api/api'
import './home.css'

export class home extends Component {
  componentDidMount(){
    requestCourses().then(res=>{
      console.log(res)
    })
  }
  render() {
    return (
      <div>
        <ClassGrade />
        <ClassGrade />
        <ClassGrade />

        <Announcements />

        <div className="GPA_group">
          <div className="current">Current GPA: 2.0</div>
          <div className="cumulative">Cumulative GPA: 3.2</div>
        </div>
      </div>
    )
  }
}

export default home

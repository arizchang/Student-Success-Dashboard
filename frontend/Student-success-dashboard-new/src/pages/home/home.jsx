import React, { Component } from 'react'
import ClassGrade from '../../components/classGrade/classGrade'
import Announcements from '../../components/announcements/announcements'
import * as api from '../../api/api'
import './home.css'

export class home extends Component {
  constructor(props){
    super(props);
    this.state = {
      courses: null,
      Announcements: null

    }
  }

  componentDidMount(){
    api.requestCourses().then(res=>{
      this.setState({
        courses: res.data
      })
    })
    api.requestAnnouncements().then(res=>{
      this.setState({
        Announcements: res.data
      })
    })
  }
  render() {
    return (
      <div>
        {
          this.state.courses && this.state.courses.map(item=> <ClassGrade data={item} />)
        }

        <Announcements announcements={this.state.Announcements} />

        <div className="GPA_group">
          <div className="current">Current GPA: 2.0</div>
          <div className="cumulative">Cumulative GPA: 3.2</div>
        </div>
      </div>
    )
  }
}

export default home

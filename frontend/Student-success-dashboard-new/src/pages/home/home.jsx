import React, { Component } from "react";
import ClassGrade from "../../components/classGrade/classGrade";
import Announcements from "../../components/announcements/announcements";
import * as api from "../../api/api";
import "./home.css";

export class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null,
      Announcements: null,
    };
  }

  componentDidMount() {
    Promise.all([api.requestCourses(), api.requestGrades(),api.requestWeights(),api.requestAssignments()]).then((res) => {
      let courses = res[0].data;
      let grades = res[1].data;
      let weights = res[2].data;
      let assignments = res[3].data;

      // courses 去重
      let arr = [];
      courses = courses.filter((course) => {
        if (arr.includes(course.id)) return false;

        arr.push(course.id);
        return true;
      });
      
      // 将课程成绩和成绩比重添加至课程对象中
      courses.forEach((course,index) => {
        course.grades = grades[index].grades;
        course.weights = weights[index];
        course.assignments = assignments[index];
      });

      this.setState({
        courses: courses,
        courseNames: courses.map(course => course.name.split(':')[0])
      });
    });



    api.requestAnnouncements().then((res) => {
      this.setState({
        Announcements: res.data,
      });
    });
  }
  render() {
    return (
      <div style={{overflow: 'hidden'}}>
        {
          this.state.courses && this.state.courses.map(item=> <ClassGrade data={item} />)
        }

        <Announcements announcements={this.state.Announcements} courseNames = {this.state.courseNames} />

        {/* <div className="GPA_group">
          <div className="current">Current GPA: 2.0</div>
          <div className="cumulative">Cumulative GPA: 3.2</div>
        </div> */}
      </div>
    );
  }
}

export default home;

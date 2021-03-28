import React, { Component } from "react";
import "./dueDate.css";
import { requestCourses, requestAssignments } from "../../api/api";

export class dueDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null,
    };
  }

  componentDidMount() {
    requestCourses().then((res) => {
      this.setState({
        courses: res.data,
      });
    });
  }

  render() {
    let { courses } = this.state;
    return (
      <div className="dueDate">
        <div className="title">
          <span>Classes</span>
          <span>Description</span>
        </div>
        <div className="content">
          {courses &&
            courses.map((item) => (
              <div className="item"  key={item.id}>
                <div className="item_title">{item.name}</div>
                <div className="item_con">
                  <p>HW - 1 Due: October 31 2020</p>
                  <p>
                    In this project, you will be writing a program that receives a string of characters via the UART,
                    checks if this string is a palindrome, and then uses a print function to print either “Yes” or “No”.
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default dueDate;

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
    Promise.all([requestCourses(), requestAssignments()]).then((res) => {
      console.log(res);
      let courses = res[0].data;
      let assignments = res[1].data;

      // courses 去重
      let arr = [];
      courses = courses.filter((course) => {
        if (arr.includes(course.id)) return false;

        arr.push(course.id);
        return true;
      });

      this.setState({
        courses: courses,
        assignments: assignments,
      });
    });
  }

  render() {
    let { courses, assignments } = this.state;
    return (
      <div className="dueDate">
        <div className="title">
          <span>Classes</span>
          <span>Description</span>
        </div>
        <div className="content">
          {assignments &&
            assignments.map((item, index) => {
              if (!item.length) return false;

              return (
                <div className="item" key={index}>
                  <div className="item_title">{courses[index].name}</div>
                  {item.map((assignment, idx) => assignment.description && (
                    <div className="item_con">
                      <p style={{minWidth: "200px"}}>
                        {/* HW - 1  */}
                        Due:{assignment.due_at && new Date(assignment.due_at).toDateString()}
                        {item.end_at && new Date(item.end_at).toDateString()}
                      </p>
                      <div dangerouslySetInnerHTML = {{__html: assignment.description}}>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default dueDate;

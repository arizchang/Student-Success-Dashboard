import React from 'react';
import './courses.css';
import { Link } from 'react-router-dom';

class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    fetch('/api/courses')
      .then(res => res.json())
      .then(courses => this.setState({courses}, () => console.log('Courses fetched...', courses)));
  }

  render() {
    return (
      <div>
        <h2>Courses</h2>
        <ul>
            {this.state.courses.map(course => 
                <li key={course.id}> {courseURL(course.id, course.name)} </li>
            )}
        </ul>
      </div>
    );
  }
}

function courseURL(courseID, courseName){
  let url = "https://asu.instructure.com/courses/" + courseID;
  return <a href = {url}>{courseName}</a>
}

export default Courses;
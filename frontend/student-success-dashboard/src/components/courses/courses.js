import React from 'react';
import './courses.css';


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
                <li key={course.id}> {course.name} </li>
            )}
        </ul>
      </div>
    );
  }
}

export default Courses;
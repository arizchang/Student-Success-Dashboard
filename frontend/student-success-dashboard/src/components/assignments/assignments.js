import React from 'react';
import './assignments.css';


class Assignments extends React.Component {
  constructor() {
    super();
    this.state = {
      assignments: []
    };
  }

  componentDidMount() {
    fetch('/api/assignments')
      .then(res => res.json())
      .then(assignments => this.setState({assignments}, () => console.log('Assignments fetched...', assignments)));
  }

  render() {
    return (
      <div>
        <h2>Assignments</h2>
        <ul>
            {this.state.assignments.map(assignment => 
                <li key={assignment.id}> 
                {assignmentURL(assignment.course_id, assignment.id, assignment.name)} <li>{'Assignment Due: ' + assignment.due_at}</li>  {stripHTML(assignment.description)} </li>
            )}
        </ul>
      </div>
    );
  }
}

function stripHTML(string){
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = string;
  return tempDiv.textContent || tempDiv.innerText || "";
}

function assignmentURL(courseID, assignmentID, assignmentName){
  let url = "https://asu.instructure.com/courses/" + courseID + "/assignments/" + assignmentID;
  return <a href = {url}>{assignmentName}</a>
}

export default Assignments;
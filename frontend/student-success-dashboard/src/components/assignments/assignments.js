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
                <li key={assignment.id}> {assignment.name} {assignment.description} {assignment.due_at}</li>
            )}
        </ul>
      </div>
    );
  }
}

export default Assignments;
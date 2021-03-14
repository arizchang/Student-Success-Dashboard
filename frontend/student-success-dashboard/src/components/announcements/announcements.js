import React from 'react';
import './announcements.css';


class Announcements extends React.Component {
  constructor() {
    super();
    this.state = {
      announcements: []
    };
  }

  componentDidMount() {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(announcements => this.setState({announcements}, () => console.log('Announcements fetched...', announcements)));
  }

  render() {
    return (
      <div>
        <h2>Announcements</h2>
        <ul>
            {this.state.announcements.map(announcement => 
                <li key={announcement.id}> {announcement.title} {announcement.message}</li>
            )}
        </ul>
      </div>
    );
  }
}

export default Announcements;
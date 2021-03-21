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
                <li key={announcement.id}> {announcementURL(announcement.url, announcement.title)} <li>{"Posted At: " + announcement.posted_at}</li> {stripHTML(announcement.message)}</li>
            )}
        </ul>
      </div>
    );
  }
}

function stripHTML(string){
      let tempDiv = document.createElement("li");
      tempDiv.innerHTML = string;
      return tempDiv.textContent || tempDiv.innerText || "";
}

function announcementURL(announcementURL, announcementName){
  return <a href = {announcementURL}>{announcementName}</a>
}

export default Announcements;
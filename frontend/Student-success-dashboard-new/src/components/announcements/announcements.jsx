import React, { Component } from "react";
import "./announcements.css";

export class announcements extends Component {

  render() {
    let { announcements, courseNames} = this.props;
    return (
      <div className="announcements">
        <div className="title">Announcements</div>
        <table border="1" cellSpacing="0">
          <thead>
            <tr>
              <th style={{"min-width": "100px"}}>Class</th>
              <th>Name</th>
              <th style={{"min-width": "250px"}}>Topic</th>
              <th style={{"min-width": "150px"}}>Post Date</th>
              <th>Announcements</th>
            </tr>
          </thead>
          <tbody>
            {announcements &&
              announcements.map((item,index) => {

                if(item.length === 0 ) return null;

  
                if(item.length > 4){
                  item = item.slice(0,4)
                }

                return item.map((announcement,idx) => (
                  <tr key={item.id}>
                    {idx===0 ? <td rowSpan={item.length}>{courseNames[index]}</td> : '' }
                    <td>{announcement.user_name}</td>
                    <td>{announcementURL(announcement.url, announcement.title)}</td>
                    <td>{announcement.created_at && new Date(announcement.created_at).toDateString()}</td>
                    <td style={{"max-width": "500px"}}>
                      <div className="td" dangerouslySetInnerHTML = {{__html: announcement.message}}>
  
                      </div>
                    </td>
                  </tr>
                ))
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

function announcementURL(announcementURL, announcementName){
  return <a href = {announcementURL}>{announcementName}</a>
}

export default announcements;

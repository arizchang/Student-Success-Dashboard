import React, { Component } from 'react'
import './announcements.css'

export class announcements extends Component {
  render() {
    return (
      <div className="announcements">
        <div className="title">Announcements</div>
        <table border="1" cellSpacing="0">
          <thead>
            <tr>
              <th>Class</th>
              <th>Name</th>
              <th>Topic</th>
              <th>Post Date</th>
              <th>Announcements</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">CSE</td>
              <td>NaKamura</td>
              <td>Exam2</td>
              <td>Oct 20, 2020 at 4:07pm</td>
              <td>This week we have Exam 2 on oct 20</td>
            </tr>
            <tr>
              <td>NaKamura</td>
              <td>Exam2</td>
              <td>Oct 20, 2020 at 4:07pm</td>
              <td>This week we have Exam 2 on oct 20</td>
            </tr>
            <tr>
              <td rowSpan="2">CSE</td>
              <td>NaKamura</td>
              <td>Exam2</td>
              <td>Oct 20, 2020 at 4:07pm</td>
              <td>This week we have Exam 2 on oct 20</td>
            </tr>
            <tr>
              <td>NaKamura</td>
              <td>Exam2</td>
              <td>Oct 20, 2020 at 4:07pm</td>
              <td>This week we have Exam 2 on oct 20</td>
            </tr>
            <tr>
              <td rowSpan="2">CSE</td>
              <td>NaKamura</td>
              <td>Exam2</td>
              <td>Oct 20, 2020 at 4:07pm</td>
              <td>This week we have Exam 2 on oct 20</td>
            </tr>
            <tr>
              <td>NaKamura</td>
              <td>Exam2</td>
              <td>Oct 20, 2020 at 4:07pm</td>
              <td>This week we have Exam 2 on oct 20</td>
            </tr>
            <tr>
              <td rowSpan="2">CSE</td>
              <td>NaKamura</td>
              <td>Exam2</td>
              <td>Oct 20, 2020 at 4:07pm</td>
              <td>This week we have Exam 2 on oct 20</td>
            </tr>
            <tr>
              <td>NaKamura</td>
              <td>Exam2</td>
              <td>Oct 20, 2020 at 4:07pm</td>
              <td>This week we have Exam 2 on oct 20</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default announcements

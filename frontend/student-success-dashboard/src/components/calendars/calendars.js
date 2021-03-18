import React from 'react';
import './calendars.css';


class Calendars extends React.Component {
  constructor() {
    super();
    this.state = {
      calendars: []
    };
  }

  componentDidMount() {
    fetch('/api/calendars')
      .then(res => res.json())
      .then(calendars => this.setState({calendars}, () => console.log('Calendars fetched...', calendars)));
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Calendars;
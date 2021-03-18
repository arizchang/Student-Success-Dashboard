import React from 'react';
//import Nav from './components/Nav';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Courses from './components/courses/courses';
import Announcements from './components/announcements/announcements';
import Assignments from './components/assignments/assignments';
//import Calendars from './components/calendars/calendars';

class App extends React.Component{
    render() {
        return (
            <div className="App">
                <header className="App-header">
                <nav className="navbar">
                    <a href = "index.html"> Home</a> &nbsp;
                    <a href = "gallery.html"> Due Dates</a> &nbsp;
                    <a href = "prices.html"> Calender</a> &nbsp;
                    <a href = "Feedback.html"> MyASU</a> &nbsp;
                    </nav>
                </header>
                <Courses />
                <Announcements />
                <Assignments />
                {
                /* <div className="navbar-container">
                    <div className='menu-icon'>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </link>
                        </li>
                        <li className='nav-item'>
                            <link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Due Dates
                            </link>
                            </li>
                            <li className='nav-item'>
                            <link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Calender
                            </link>
                        </li>
                    </ul>
                    </div>
                </div> */}
            </div>
        );
    }
}

/*
class App extends Component{
    render() {
        return (
            
        );
    }
}*/

export default App;

import React, { Component } from 'react';
import {  Switch, Route, Redirect } from 'react-router-dom';

import home from '../pages/home/home';
import dueDate from '../pages/dueDate/dueDate';
import calender from '../pages/calender/calender';


class RouteConfig extends Component{
  render(){
    return(
        <Switch>
          <Route path="/home" exact component={home} />
          <Route path="/dueDate" component={dueDate} />
          <Route path="/calender" component={calender} />
          <Redirect to="/home" />
        </Switch>
    )
  }
}


export default RouteConfig;

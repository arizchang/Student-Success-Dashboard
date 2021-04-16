/*
 * @Author: your name
 * @Date: 2021-04-04 22:09:43
 * @LastEditTime: 2021-04-11 22:47:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Student-Success\frontend\Student-success-dashboard-new\src\api\api.js
 */
import http from './http';


export const requestCourses = () =>http.get('/api/courses');

export const requestAnnouncements=() =>http.get('/api/announcements');

export const requestAssignments = ()=>http.get('/api/assignments');

export const requestUpcomingAssignments = ()=>http.get('/api/upcomingassignments');

export const requestCalendars = ()=>http.get('/api/calendars')

// export const requestGrades = ()=>http.get('/api/grades')
export const requestGrades = ()=>http.get('/api/coursegrades')
// coursegrades

export const requestWeights = ()=>http.get('/api/weights')
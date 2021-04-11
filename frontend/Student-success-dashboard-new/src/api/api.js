/*
 * @Author: your name
 * @Date: 2021-04-04 22:09:43
 * @LastEditTime: 2021-04-10 18:58:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Student-Success\frontend\Student-success-dashboard-new\src\api\api.js
 */
import http from './http';


export const requestCourses = () =>http.get('/api/courses');

export const requestAnnouncements=() =>http.get('/api/announcements');

export const requestAssignments = ()=>http.get('/api/assignments');

export const requestCalendars = ()=>http.get('/api/calendars')

export const requestGrades = ()=>http.get('/api/grades')
export const requestWeights = ()=>http.get('/api/weights')
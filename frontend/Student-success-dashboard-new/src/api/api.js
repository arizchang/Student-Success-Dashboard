import http from './http';


export const requestCourses = () =>http.get('/api/courses');

export const requestAnnouncements=() =>http.get('/api/announcements');

export const requestAssignments = ()=>http.get('/api/assignments');

export const requestCalendars = ()=>http.get('/api/calendars')
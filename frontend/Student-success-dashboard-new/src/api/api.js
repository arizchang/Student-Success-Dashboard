import http from './http';


export const requestCourses = () =>http.get('/api/');

export const requestAnnouncements=() =>http.get('/api/announcements');
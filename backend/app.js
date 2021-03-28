// required imports
const express = require('express')
const axios = require('axios')
const token = require('./tokens').token
const app = express()

// JSONs to be filled
var currentCourses = []
var announcements = []
var calendarData = []
var assignments = []

// functions to get and clean data from Canvas
// fills currentCourses JSON
function getCurrentCourses(term, year) {
	//Set what the current term and year is to a object
	var current = year.concat(term)
	//Axios call
	axios
		.get('https://asu.instructure.com/api/v1/courses?per_page=100', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			//Loop through each class in canvas
			for (var i = 0; i < res.data.length; i++) {
				//If a class has been restricted, don't push to the array
				if (res.data[i]['course_code'] === undefined) {
					continue
				}
				//If the class code matches with the year and term, push to new array
				if (res.data[i]['course_code'].includes(current) == true) {
					currentCourses.push(res.data[i])
				}
			}
		})
		.catch((err) => console.log(err))
}

// get announcements from a particular course
function getAnnouncements(courseID) {
	//Make new array and get the current date
	//Axios call
	axios
		.get(
			'https://asu.instructure.com/api/v1/courses/' +
				courseID +
				'/discussion_topics?only_announcements=true&per_page=100',
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		//Loop through each announcment in a specfied class in canvas
		.then((res) => {
			for (var i = 0; i < res.data.length; i++) {
				announcements.push(res.data[i])
			}
			for(let j = 0; j < announcements.length; j++){
				let date = new Date(announcements[j]['posted_at'])
				announcements[j]["posted_at"] = date.toLocaleString()
			}
		})
		.catch((err) => console.log(err))
}

// get announcements from all courses
function getAllAnnouncements() {
	console.log(currentCourses.length)
	for (course in currentCourses) {
		console.log(course.id)
		getAnnouncements(course.id)
	}
}

// get calendar data for current term
function getCurrentCalendarData(term, year) {
	//Set what the current term and year is to a object
	var current = year.concat(term)

	//Axios call
	axios
		.get('https://asu.instructure.com/api/v1/courses?per_page=100', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			//Loop through each class in canvas
			for (var i = 0; i < res.data.length; i++) {
				//If a class has been restricted, don't push to the array
				if (res.data[i]['course_code'] === undefined) {
					continue
				}
				//If the class code matches with the year and term, push to new array
				if (res.data[i]['course_code'].includes(current) == true) {
					if (res.data[i]['calendar'] !== undefined) {
						calendarData.push(res.data[i]['calendar']['ics'])
					}
				}
			}
		})
		.catch((err) => console.log(err))
}

// gets list of upcoming assignments for a specified class
function getUpcomingAssignments(courseID) {
	//Make new array and get the current date
	let date = new Date()

	//Axios call
	axios
		.get(
			'https://asu.instructure.com/api/v1/courses/' + courseID + '/assignments?per_page=100',
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		//Loop through each assignment in a specfied class in canvas
		.then((res) => {
			for (var i = 0; i < res.data.length; i++) {
				//If the due date of the assignment is due later than the users current date, push to array
				if (res.data[i]['due_at'] > date.toISOString()) {
					assignments.push(res.data[i])
				}
			}
			for(let j = 0; j < assignments.length; j++){
				let date = new Date(assignments[j]['due_at'])
				assignments[j]["due_at"] = date.toLocaleString()
			}
		})
		.catch((err) => console.log(err))
}

// call above getter functions
getCurrentCourses('Spring', '2021')
getAnnouncements('75138')
getCurrentCalendarData('Spring', '2021')
getUpcomingAssignments('75138')

// sending JSONs to server
<<<<<<< HEAD
/*
app.get('/', (req, res) => res.json(currentCourses))
app.get('/announcements', (req, res) => res.json(announcements))
*/

=======
>>>>>>> 1d3183e75cdaac28cb2b7e54ac81db6e42da0a4f
app.get('/api/courses', (req, res) => res.json(currentCourses))
app.get('/api/announcements', (req, res) => res.json(announcements))
app.get('/api/assignments', (req,res) => res.json(assignments))
app.get('/api/calendars', (req,res) => res.json(calendarData))

<<<<<<< HEAD
=======

>>>>>>> 1d3183e75cdaac28cb2b7e54ac81db6e42da0a4f
// setting port and starting server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

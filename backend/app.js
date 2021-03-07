// required imports
const express = require('express')
const axios = require('axios')
const token = require('./tokens').token
const app = express()

// JSONs to be filled
var currentCourses = []
var announcements = []

// functions to get and clean data from Canvas
// fills currentCourses JSON
function getCurrentCourses(term, year) {
	//Set what the current term and year is to a object
	var current = year.concat(term)
	var cur = []
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
					cur.push(res.data[i])
				}
			}
			currentCourses.push(cur)
		})
		.catch((err) => console.log(err))
}

// get announcements from a particular course
function getAnnouncements(courseID) {
	//Make new array and get the current date
	var cur = []
	//Axios call
	axios
		.get(
			'https://asu.instructure.com/api/v1/courses/' +
				courseID +
				'/discussion_topics?only_announcements=true',
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		//Loop through each announcment in a specfied class in canvas
		.then((res) => {
			for (var i = 0; i < res.data.length; i++) {
				cur.push(res.data[i])
			}
			announcements.push(cur)
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

// call above getter functions
getCurrentCourses('Spring', '2021')
getAnnouncements('75138')
//getAllAnnouncements()

// sending JSONs to server
app.get('/', (req, res) => res.json(currentCourses))
app.get('/announcements', (req, res) => res.json(announcements))

// setting port and starting server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

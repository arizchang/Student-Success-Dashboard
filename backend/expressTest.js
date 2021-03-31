const express = require('express')
const axios = require('axios')
const token = require('./tokens').token
const client_id = require('./tokens').client_id

const app = express()
var enrollments
var currentCourses
var id

// list enrollments
function getEnrollments() {
	axios
		.get('https://asu.instructure.com/api/v1/users/self/enrollments', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => (enrollments = res.data))
		.catch((err) => console.log(err))
}

// return json of current courses
function getCurrentCourses() {
	var term = 'Spring'
	var year = '2021'
	var current = year.concat(term)
	var myObj
	var cur = []

	axios
		.get('https://asu.instructure.com/api/v1/courses?per_page=100', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			myObj = res.data
			console.log(myObj.length)
			for (var i = 0; i < myObj.length - 13; i++) {
				//console.log(myObj[i]['course_code'])
				if (myObj[i]['course_code'].includes(current) == true) {
					cur.push(myObj[i])
				}
			}
			//console.log(cur)
			currentCourses = cur
			let json = JSON.stringify(cur)
			//console.log(json)
			return json
		})
		.catch((err) => console.log(err))
}

let theJSON = getCurrentCourses()
//console.log(theJSON)
app.get('/', (req, res) => res.json(currentCourses))

// OAuth2
app.get('/auth', (req, res) => {
	res.redirect(
		`https://canvas-dev.asu.edu/login/oauth2/auth?client_id=${client_id}&response_type=code&redirect_uri=http://localhost:3000/oauth_callback&scope=/auth/userinfo`
	)
})

// getEnrollments()
// console.log(enrollments)
// // Get all enrollments
// app.get('/', (req, res) => res.json(enrollments))

// // Get single enrollment
// app.get('/:id', (req, res) => {
// 	res.json(
// 		enrollments.filter(
// 			(enrollment) => enrollment.id === parseInt(req.params.id)
// 		)
// 	)
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

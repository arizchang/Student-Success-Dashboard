// required imports
const express = require('express')
const axios = require('axios')
const token = require('./tokens').token
const app = express()

// JSONs to be filled
var currentCourses

// functions to get and clean data from Canvas
// fills currentCourses JSON
function getCurrentCourses() {
	var term = 'Spring'
	var year = '2021'
	var current = year.concat(term)
	var myObj
	var cur = []

	return axios
		.get('https://asu.instructure.com/api/v1/courses?per_page=100', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			myObj = res.data
			console.log(myObj.length)
			for (var i = 0; i < myObj.length - 13; i++) {
				console.log(myObj[i]['course_code'])
				if (myObj[i]['course_code'].includes(current) == true) {
					cur.push(myObj[i])
				}
			}
			console.log(cur)
			currentCourses = cur
		})
		.catch((err) => console.log(err))
}

// call above getter functions
getCurrentCourses()

// sending JSONs to server
app.get('/', (req, res) => res.json(currentCourses))

// setting port and starting server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

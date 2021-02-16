// required imports
const axios = require('axios')
const token = require('./tokens').token

// JSONs to be used by app.js
var currentCourses

// functions to get and modify data from Canvas
// ---------------------------------------------

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

getCurrentCourses()

// exporting JSONs to be used by app.js
module.exports.currentCourses = currentCourses

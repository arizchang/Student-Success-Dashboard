const axios = require('axios')
const token = require('./tokens').token

function getCourses() {
	axios
		.get('https://asu.instructure.com/api/v1/courses?include=total_scores', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
}

// gets list of assignments for CSE 335
function getAssignments() {
	axios
		.get('https://asu.instructure.com/api/v1/courses/59145/assignments', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
}

getCourses()
//getAssignments()

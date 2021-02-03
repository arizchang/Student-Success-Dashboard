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

// list enrollments
function getEnrollments() {
	axios
		.get('https://asu.instructure.com/api/v1/users/self/enrollments', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => console.log(res.data[0]))
		.catch((err) => console.log(err))
}

// get user
function getUser() {
	axios
		.get('https://asu.instructure.com/api/v1/accounts/63/users', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err))
}

// get account (which is the ID for the college e.g. Ira A Fulton)
function getAccount() {
	axios
		.get('https://asu.instructure.com/api/v1/accounts/63', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err))
}

//getCourses()
//getAssignments()
getEnrollments()
//getUser()
//getAccount()

const axios = require('axios')
const token = require('./tokens').token

// gets list of upcoming assignments for a specified class
function getUpcomingAssignments(courseID) {
	axios
		.get('https://asu.instructure.com/api/v1/courses/' + courseID + '/assignments', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err))
}

//Get all courses in the current year and term and return it as a JSON
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
				if(res.data[i]['access_restricted_by_date'] == true){
					continue;
				}
				//If the class code matches with the year and term, push to new array
				if (res.data[i]['course_code'].includes(current) == true) {
					cur.push(res.data[i])
				}
			}
			console.log(cur)
			//Create JSON object from array
			let json = JSON.stringify(cur)
			//console.log(json)
			//Return JSON object
			return json
		})
		.catch((err) => console.log(err))
}

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

// gets list of assignments for a specified class
function getAssignments(courseID) {
	axios
		.get('https://asu.instructure.com/api/v1/courses/' + courseID + '/assignments', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => console.log(res.data))
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

getUpcomingAssignments("79772")
//getCurrentCourses("Spring", "2021")
//getCourses()
//getAssignments("79772")
//getEnrollments()
//getUser()
//getAccount()

const axios = require('axios')
const token = require('./tokens').token

function getAnnouncements(courseID){
	//Make new array and get the current date
	var cur = []
	//Axios call
	axios
		.get('https://asu.instructure.com/api/v1/courses/' + courseID + '/discussion_topics?only_announcements=true', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		//Loop through each announcment in a specfied class in canvas
		.then((res) => {
			for(var i = 0; i < res.data.length; i++){
				cur.push(res.data[i])
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

// gets list of upcoming assignments for a specified class
function getUpcomingAssignments(courseID) {
	//Make new array and get the current date
	var cur = []
	let date = new Date();

	//Axios call
	axios
		.get('https://asu.instructure.com/api/v1/courses/' + courseID + '/assignments', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		//Loop through each assignment in a specfied class in canvas
		.then((res) => {
			for(var i = 0; i < res.data.length; i++){
				//If the due date of the assignment is due later than the users current date, push to array
				if(res.data[i]['due_at'] > date.toISOString()){
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
				if(res.data[i]['course_code'] === undefined){
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
		.then((res) => console.log(res.data))
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

getAnnouncements("75138")
// getUpcomingAssignments("75138")
// getCurrentCourses("Spring", "2021")
// getCourses()
// getAssignments("75138")
// getEnrollments()
// getUser()
// getAccount()

const axios = require('axios')
const token = require('./tokens').token

//Get all courses in the current year and term and return it as a JSON
function getCurrentCourses() {
	var term = "Spring";
	var year = "2021";
	var current = year.concat(term);
	var myObj
	var cur = []

	axios
		.get('https://asu.instructure.com/api/v1/courses?per_page=100', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			myObj = res.data;
			for(var i = 0; i < myObj.length; i++)
			{
				if(myObj[i]["course_code"].includes(current) == true){
					cur.push(myObj[i])
				}
			}
			//console.log(cur)
			let json = JSON.stringify(cur);
			//console.log(json);
			return json;
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

getCurrentCourses()
//getCourses()
//getAssignments()
//getEnrollments()
//getUser()
//getAccount()

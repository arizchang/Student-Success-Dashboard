const axios = require('axios')
const token = require('./tokens').token

const allCourseID = []

//Get all graded assignments from each class for a user
async function getAllGrades() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Have a empty array to fill with urls for axios calls & to fill with assignment names & descriptions
	let urls = []
	let grades = []
	//Get the course ID for each class the user is assigned to
	const courseID = await getCurrentCourses('Spring', '2021')

	//Fill the array with urls to each course assignment page
	for(let i = 0; i < courseID.length; i++){
		urls.push(axios.get('https://asu.instructure.com/api/v1/courses/' + courseID[i] + '/students/submissions?per_page=100'))
	}
	
	axios.all(
		urls,
	)
	//Loop through each assignment in a specfied class in canvas
	.then(
		axios.spread((...res) =>{
			for(let i = 0; i < courseID.length; i++){
				for(let j = 0; j < res[i].data.length; j++){
					if(res[i].data[j]['workflow_state'] === 'graded'){
						grades.push(res[i].data[j])
					}
				}
			}
			console.log(grades)
			return grades
		})
	)
	.catch((err) => console.log(err))
}

//Get all announcements from each class for a user
async function getAllAnnouncements() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Have a empty array to fill with urls for axios calls & to fill with assignment names & descriptions
	let urls = []
	let announcements = []
	//Get the course ID for each class the user is assigned to
	const courseID = await getCurrentCourses('Spring', '2021')

	//Fill the array with urls to each course assignment page
	for(let i = 0; i < courseID.length; i++){
		urls.push(axios.get('https://asu.instructure.com/api/v1/courses/' + courseID[i] + '/discussion_topics?only_announcements=true&per_page=100'))
	}
	
	axios.all(
		urls,
	)
	//Loop through each assignment in a specfied class in canvas
	.then(
		axios.spread((...res) =>{
			for(let i = 0; i < courseID.length; i++){
				for(let j = 0; j < res[i].data.length; j++){
					announcements.push(res[i].data[j])
				}
			}
			console.log(announcements)
			return announcements
		})
	)
	.catch((err) => console.log(err))
}

//Get all assignments from each class for a user
async function getAllAssignments(){
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Have a empty array to fill with urls for axios calls & to fill with assignments names & descriptions
	let urls = []
	let assignments = []
	let date = new Date()
	//Get the course ID for each class the user is assigned to
	const courseID = await getCurrentCourses('Spring', '2021')

	//Fill the array with urls to each course assignment page
	for(let i = 0; i < courseID.length; i++){
		urls.push(axios.get('https://asu.instructure.com/api/v1/courses/' + allCourseID[i] + '/assignments?per_page=100'))
	}
	
	axios.all(
		urls,
	)
	//Loop through each assignments in a specfied class in canvas
	.then(
		axios.spread((...res) =>{
			for(let i = 0; i < courseID.length; i++){
				for(let j = 0; j < res[i].data.length; j++){
					if(res[i].data[j]['due_at'] > date.toISOString()){
						assignments.push(res[i].data[j])
					}
				}
			}
			console.log(assignments)
			return assignments
		})
	)
	.catch((err) => console.log(err))
}

//Get graded assignments for a class
function getGrades(courseID){
	//Make new array and get the current date
	var cur = []
	//Axios call
	axios
		.get(
			'https://asu.instructure.com/api/v1/courses/' + courseID + '/students/submissions?per_page=100',
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		//Loop through each assignment in a specfied class in canvas
		.then((res) => {
			for (var i = 0; i < res.data.length; i++) {
				//Check if that assignment has been graded
				if (res.data[i]['workflow_state'] === 'graded') {
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
	let date = new Date()

	//Axios call
	axios
		.get(
			'https://asu.instructure.com/api/v1/courses/' + courseID + '/assignments',
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
async function getCurrentCourses(term, year) {
	//Set what the current term and year is to a object
	var current = year.concat(term)
	var cur = []
	const studentEnrolled = await getEnrollments() 
	//console.log(studentEnrolled)
	//Axios call
	axios
		return axios.get('https://asu.instructure.com/api/v1/courses?per_page=100', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			//Loop through each class in canvas
			//console.log(res.data.length)
			for (var i = 0; i < res.data.length; i++) {
				//If a class has been restricted, don't push to the array
				if (res.data[i]['course_code'] === undefined) {
					continue
				}		
				for(let j = 0; j < studentEnrolled.length; j++){
					if(res.data[i]['id'] == studentEnrolled[j]['course_id']){
						if(studentEnrolled[j]['role'] == 'StudentEnrollment'){
							//If the class code matches with the year and term, push to new array
							if (res.data[i]['course_code'].includes(current) == true) {
								allCourseID.push(res.data[i]["id"])
								cur.push(res.data[i])
							}
						}
					}
				}
			}
			console.log(allCourseID)
			return allCourseID
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

async function getCurrentCalendarData(term, year) {
	//Set what the current term and year is to a object
	var current = year.concat(term)
	var calendars = []
	const courses = await getCurrentCourses(term, year)

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
				//If the class code matches with the year and term, push to new array
				if (courses.some((courseid) => courseid == res.data[i]['id'])) {
					if (res.data[i]['calendar'] !== undefined) {
						calendars.push(res.data[i]['calendar']['ics'])
					}
				}
			}
			console.log(calendars)
			//Create JSON object from array
			let json = JSON.stringify(calendars)
			// console.log(json)
			//Return JSON object
			return json
		})
		.catch((err) => console.log(err))
}

// gets list of assignments for a specified class
function getAssignments(courseID) {
	axios
		.get(
			'https://asu.instructure.com/api/v1/courses/' + courseID + '/assignments?per_page=100',
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err))
}

// list enrollments
async function getEnrollments() {
	let enrollment = []
	axios
		return axios.get('https://asu.instructure.com/api/v1/users/self/enrollments?per_page=100', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			//console.log(res.data)
			for(let i = 0; i < res.data.length; i++){
				let noDups = false
				//console.log(i)
				for(let j = i+1; j < res.data.length; j++){
					if(res.data[i]['course_id'] == res.data[j]['course_id']){
						noDups = true
						//console.log("Return true" + res.data[i]['course_id'])
					}
				}
				if(noDups == false){
					enrollment.push(res.data[i])
				}
			}
			//console.log(enrollment.length)
			return enrollment
		})
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
		return axios.get('https://asu.instructure.com/api/v1/users/self', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {console.log(res.data)
		})
		.catch((err) => console.log(err))
}

// getAllGrades()
// getAllAnnouncements()
// getAllAssignments()
// getGrades('75138')
// getAnnouncements('75138')
// getUpcomingAssignments("75138")
// getCurrentCourses("Spring", "2021")
// getCurrentCalendarData('Spring', '2021')
// getCourses()
// getAssignments("75138")
// getEnrollments()
// getUser()
// getAccount()
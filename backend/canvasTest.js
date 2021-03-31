const axios = require('axios')
const token = require('./tokens').token

//Get all course weights from each class for a user
async function getAllWeights() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Have a empty array to fill with urls for axios calls & to fill with weights names & percentages
	let urls = []
	let weights = []
	//Get the course ID for each class the user is assigned to
	const courseID = await getCurrentCourses()

	//Fill the array with urls to each course weights page
	for(let i = 0; i < courseID.length; i++){
		urls.push(axios.get('https://asu.instructure.com/api/v1/courses/' + courseID[i]['id'] + '/assignment_groups?per_page=100').catch(() => {return undefined;}))
	}
	
	axios.all(
		urls,
	)
	//Loop through each weights in a specfied class in canvas
	.then(
		axios.spread((...res) =>{
			for(let i = 0; i < courseID.length; i++){
				if(res[i] === undefined){
					weights.push("No Course Weights Available")
					continue
				}
				for(let j = 0; j < res[i].data.length; j++){
					weights.push(res[i].data[j])
				}
			}
			//console.log(weights)
			return weights
		})
	)
	.catch((err) => console.log(err))
}

//Get current enrollment information
async function getCurrentEnrollments(){
	let enrollments = []
	//Get all courses the student has ever enrolled into
	const studentEnrolled = await getEnrollments() 
	//Get the course ID for each class the user is assigned to
	const courseID = await getCurrentCourses()
	for(let i = 0; i < courseID.length; i++){
		for(let j = 0; j < studentEnrolled.length; j++){
			if(courseID[i]["id"] === studentEnrolled[j]["course_id"]){
				enrollments.push(studentEnrolled[j])
			}
		}
	}
	//console.log(enrollments)
	return enrollments
}

//Get all upcoming quizzes from each class for a user
async function getAllUpcomingQuizzes(){
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Have a empty array to fill with urls for axios calls & to fill with quizzes names & descriptions
	let urls = []
	let quizzes = []
	let date = new Date()
	//Get the course ID for each class the user is assigned to
	const courseID = await getCurrentCourses()

	//Fill the array with urls to each course quizzes page
	for(let i = 0; i < courseID.length; i++){
		urls.push(axios.get('https://asu.instructure.com/api/v1/courses/' + courseID[i]['id'] + '/quizzes?per_page=100').catch(() => {return undefined;}))
	}

	axios.all(
		urls,
	)
	//Loop through each quizzes in a specfied class in canvas
	.then(
		axios.spread((...res) =>{
			for(let i = 0; i <= courseID.length; i++){
				if(res[i] === undefined){
					quizzes.push("No Quizzes Available")
					continue
				}
				for(let j = 0; j < res[i].data.length; j++){
					if(res[i].data[j]['due_at'] > date.toISOString()){
						quizzes.push(res[i].data[j])
					}
				}
			}
			//console.log(quizzes)
			return quizzes
		})
	)
	.catch((err) => console.log(err))
}

/*
//Get all graded assignments from each class for a user
async function getAllGrades() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Have a empty array to fill with urls for axios calls & to fill with assignment names & descriptions
	let urls = []
	let grades = []
	//Get the course ID for each class the user is assigned to
	const courseID = await getCurrentCourses()

	//Fill the array with urls to each course assignment page
	for(let i = 0; i < courseID.length; i++){
		urls.push(axios.get('https://asu.instructure.com/api/v1/courses/' + courseID[i]['id'] + '/students/submissions?per_page=100').catch(() => {return undefined;}))
	}
	
	axios.all(
		urls,
	)
	//Loop through each assignment in a specfied class in canvas
	.then(
		axios.spread((...res) =>{
			for(let i = 0; i <= courseID.length; i++){
				if(res[i] === undefined){
					grades.push("No Assignment Grades Available")
					continue
				}
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
*/

//Get all announcements from each class for a user
async function getAllAnnouncements() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Have a empty array to fill with urls for axios calls & to fill with assignment names & descriptions
	let urls = []
	let announcements = []
	//Get the course ID for each class the user is assigned to
	const courseID = await getCurrentCourses()

	//Fill the array with urls to each course assignment page
	for(let i = 0; i < courseID.length; i++){
		urls.push(axios.get('https://asu.instructure.com/api/v1/courses/' + courseID[i]['id'] + '/discussion_topics?only_announcements=true&per_page=100').catch(() => {return undefined;}))
	}
	
	axios.all(
		urls,
	)
	//Loop through each assignment in a specfied class in canvas
	.then(
		axios.spread((...res) =>{
			for(let i = 0; i < courseID.length; i++){
				if(res[i] === undefined){
					announcements.push("No Announcements Available")
					continue
				}
				for(let j = 0; j < res[i].data.length; j++){
					announcements.push(res[i].data[j])
				}
			}
			//console.log(announcements)
			return announcements
		})
	)
	.catch((err) => console.log(err))
}

//Get all upcoming assignments from each class for a user
async function getAllUpcomingAssignments(){
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Have a empty array to fill with urls for axios calls & to fill with assignments names & descriptions
	let urls = []
	let assignments = []
	let date = new Date()
	//Get the course ID for each class the user is assigned to
	const courseID = await getCurrentCourses()

	//Fill the array with urls to each course assignment page
	for(let i = 0; i < courseID.length; i++){
		urls.push(axios.get('https://asu.instructure.com/api/v1/courses/' + courseID[i]['id'] + '/assignments?per_page=100').catch(() => {return undefined;}))
	}
	
	axios.all(
		urls,
	)
	//Loop through each assignments in a specfied class in canvas
	.then(
		axios.spread((...res) =>{
			for(let i = 0; i < courseID.length; i++){
				if(res[i] === undefined){
					assignments.push("No Upcoming Assignments Available")
					continue
				}
				for(let j = 0; j < res[i].data.length; j++){
					if(res[i].data[j]['due_at'] > date.toISOString()){
						assignments.push(res[i].data[j])
					}
				}
			}
			//console.log(assignments)
			return assignments
		})
	)
	.catch((err) => console.log(err))
}

/*
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
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Make new array and get the current date
	var cur = []
	//Axios call
	axios.get('https://asu.instructure.com/api/v1/courses/' + courseID + '/discussion_topics?only_announcements=true')
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
*/

//Get all courses in the current year and term and return it as a JSON
async function getCurrentCourses() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Set what the current term and year is to a object
	let current = getTermYear()
	let cur = []
	const studentEnrolled = await getEnrollments() 
	//Axios call
	axios
		return axios.get('https://asu.instructure.com/api/v1/courses?per_page=100')
		.then((res) => {
			//Loop through each class in canvas
			for (let i = 0; i < res.data.length; i++) {
				//If a class has been restricted, don't push to the array
				if (res.data[i]['course_code'] === undefined) {
					continue
				}		
				for(let j = 0; j < studentEnrolled.length; j++){
					if(res.data[i]['id'] == studentEnrolled[j]['course_id']){
						if(studentEnrolled[j]['role'] == 'StudentEnrollment'){
							//If the class code matches with the year and term, push to new array
							if (res.data[i]['course_code'].includes(current) == true) {
								cur.push(res.data[i])
							}
						}
					}
				}
			}
			return cur
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

async function getCurrentCalendarData() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Set what the current term and year is to a object
	var current = getTermYear()
	var calendars = []
	const courses = await getCurrentCourses()

	//Axios call
	axios.get('https://asu.instructure.com/api/v1/courses?per_page=100')
		.then((res) => {
			//Loop through each class in canvas
			for (var i = 0; i < res.data.length; i++) {
				//If the class code matches with the year and term, push to new array
				if (courses.some((courseid) => courseid['id'] == res.data[i]['id'])) {
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

//Function that returns the current term and year
function getTermYear(){
	let currentDate = new Date()
	let termYear
	let year = currentDate.getFullYear()
	let fall = new Date(year,7,19,0,0,0)
	let spring = new Date(year+1,0,10,0,0,0)
	let summer = new Date(year,5,16,0,0,0)

	if(currentDate < summer){
		termYear = year + "Spring"
	}
	else if(currentDate >= summer && currentDate < fall){
		termYear = year + "Summer"
	}
	else if(currentDate >= fall && currentDate < spring){
		termYear = year + "Fall"
	}
	return termYear
}

// getAllWeights()
// getCurrentEnrollments()
// getAllUpcomingQuizzes()
// getAllGrades()
// getAllAnnouncements()
// getAllUpcomingAssignments()
// getGrades('75138')
// getAnnouncements('75138')
// getUpcomingAssignments("75138")
// getCurrentCourses()
// getCurrentCalendarData()
// getCourses()
// getAssignments("75138")
// getEnrollments()
// getUser()
// getAccount()
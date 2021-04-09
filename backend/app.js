// required imports
const express = require('express')
const axios = require('axios')
const token = require('./tokens').token
const app = express()

// JSONs to be filled
var currentCourses = []
var courseGrades = []
var allQuizzes = []
var allUpcomingQuizzes = []
var allAnnouncements = []
var calendarData = []
var allAssignments = []
var allUpcomingAssignments = []
var allWeights = []
var allGrades = []

//Function that returns the current term and year
function getTermYear(){
	let currentDate = new Date()
	let termYear
	let year = currentDate.getFullYear()
	let fall = new Date(year,7,19,0,0,0)
	let summer = new Date(year,5,16,0,0,0)

	if(currentDate < summer){
		termYear = year + "Spring"
	}
	else if(currentDate >= summer && currentDate < fall){
		termYear = year + "Summer"
	}
	else{
		termYear = year + "Fall"
	}
	return termYear
}

// list enrollments
async function getEnrollments() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	let enrollment = []
	axios
		return axios.get('https://asu.instructure.com/api/v1/users/self/enrollments?per_page=100').then((res) => {
			for(let i = 0; i < res.data.length; i++){
				let noDups = false
				for(let j = i+1; j < res.data.length; j++){
					if(res.data[i]['course_id'] == res.data[j]['course_id']){
						noDups = true
					}
				}
				if(noDups == false){
					enrollment.push(res.data[i])
				}
			}
			return enrollment
		})
		.catch((err) => console.log(err))
}

//Get all courses in the current year and term and return it as a JSON
async function getCurrentCourses() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Set what the current term and year is to a object
	let current = getTermYear()
	let cur = []
	const studentEnrolled = await getEnrollments() 
	//Resets currentCourses at every method call
	currentCourses = []
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
								currentCourses.push(res.data[i])
								break
							}
						}
					}
				}
			}
			return cur
		})
		.catch((err) => console.log(err))
}

//Get all assignments from each class for a user
async function getAllAssignments(){
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Have a empty array to fill with urls for axios calls & to fill with assignments names & descriptions
	let urls = []
	let assignments = []
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
					continue
				}
				for(let j = 0; j < res[i].data.length; j++){
					assignments.push(res[i].data[j])
				}
				allAssignments.push(assignments)
				assignments = []
			}
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
					continue
				}
				for(let j = 0; j < res[i].data.length; j++){
					if(res[i].data[j]['due_at'] > date.toISOString()){
						assignments.push(res[i].data[j])
					}
				}
				allUpcomingAssignments.push(assignments)
				assignments = []
			}
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
					continue
				}
				for(let j = 0; j < res[i].data.length; j++){
					announcements.push(res[i].data[j])
				}
				allAnnouncements.push(announcements)
				announcements = []
			}
		})
	)
	.catch((err) => console.log(err))
}

async function getCurrentCalendarData() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Set what the current term and year is to a object
	const courses = await getCurrentCourses()
	//Resets calendarData at every method call
	calendarData = []

	//Axios call
	axios.get('https://asu.instructure.com/api/v1/courses?per_page=100').then((res) => {
			//Loop through each class in canvas
			for (var i = 0; i < res.data.length; i++) {
				//If the class code matches with the courseid, push to new array
				if (courses.some((courseid) => courseid['id'] == res.data[i]['id'])) {
					if (res.data[i]['calendar'] !== undefined) {
						calendarData.push(res.data[i]['calendar']['ics'])
					}
				}
			}
		})
		.catch((err) => console.log(err))
}

//Get all quizzes from each class for a user
async function getAllQuizzes(){
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	//Have a empty array to fill with urls for axios calls & to fill with quizzes names & descriptions
	let urls = []
	let quizzes = []
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
					continue
				}
				for(let j = 0; j < res[i].data.length; j++){
					quizzes.push(res[i].data[j])
				}
				allQuizzes.push(quizzes)
				quizzes = []
			}
		})
	)
	.catch((err) => console.log(err))
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
					continue
				}
				for(let j = 0; j < res[i].data.length; j++){
					if(res[i].data[j]['due_at'] > date.toISOString()){
						quizzes.push(res[i].data[j])
					}
				}
				allUpcomingQuizzes.push(quizzes)
				quizzes = []
			}
		})
	)
	.catch((err) => console.log(err))
}

//Get current course grades
async function getCourseGrades(){
	//Get all courses the student has ever enrolled into
	const studentEnrolled = await getEnrollments() 
	//Get the course ID for each class the user is assigned to
	const courseID = await getCurrentCourses()
	//Resets courseGrades at every method call
	courseGrades = []
	for(let i = 0; i < courseID.length; i++){
		for(let j = 0; j < studentEnrolled.length; j++){
			if(courseID[i]["id"] === studentEnrolled[j]["course_id"]){
				courseGrades.push(studentEnrolled[j])
			}
		}
	}
}

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
				allWeights.push(weights)
				weights = []
			}
		})
	)
	.catch((err) => console.log(err))
}

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
				allGrades.push(grades)
				grades = []
			}
			//console.log(grades)
			return grades
		})
	)
	.catch((err) => console.log(err))
}

getCurrentCourses()
getAllAnnouncements()
getAllAssignments()
getAllUpcomingAssignments()
getCurrentCalendarData()
getAllQuizzes()
getAllUpcomingQuizzes()
getCourseGrades()
getAllWeights()
getAllGrades() 

// sending JSONs to server
app.get('/api/courses', (req, res) => res.json(currentCourses))
app.get('/api/announcements', (req, res) => res.json(allAnnouncements))
app.get('/api/assignments', (req, res) => res.json(allAssignments))
app.get('/api/upcomingassignments', (req, res) => res.json(allUpcomingAssignments))
app.get('/api/calendars', (req, res) => res.json(calendarData))
app.get('/api/quizzes', (req, res) => res.json(allQuizzes))
app.get('/api/upcommingquizzes', (req, res) => res.json(allUpcomingQuizzes))
app.get('/api/coursegrades', (req, res) => res.json(courseGrades))
app.get('/api/weights', (req, res) => res.json(allWeights))
app.get('/api/assnquizgrades', (req, res) => res.json(allGrades))

// setting port and starting server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

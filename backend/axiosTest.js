const axios = require('axios')

//get requests
function getTestLong() {
	axios({
		method: 'get',
		url: 'https://jsonplaceholder.typicode.com/todos',
		params: {
			_limit: 5,
		},
	})
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err))
}

function getTestShort() {
	axios
		.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err))
}

//post request (adding data)
function postTest() {
	axios
		.post('https://jsonplaceholder.typicode.com/todos', {
			title: 'New Todo',
			completed: false,
		})
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
}

//put request (updating data)
function putTest() {
	axios
		.put('https://jsonplaceholder.typicode.com/todos/1', {
			title: 'Updated Todo',
			completed: true,
		})
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
}

//delete request
function deleteTest() {
	axios
		.delete('https://jsonplaceholder.typicode.com/todos/1')
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
}

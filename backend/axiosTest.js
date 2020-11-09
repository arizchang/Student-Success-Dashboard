const { default: Axios } = require('axios')

const axios = require('axios')

function getTest() {
	axios({
		method: 'get',
		url: 'https://jsonplaceholder.typicode.com/todos',
	})
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
}

getTest()

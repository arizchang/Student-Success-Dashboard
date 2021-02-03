const express = require('express')
const axios = require('axios')
const token = require('./tokens').token

const app = express()
var name

// list enrollments
function getEnrollments() {
	axios
		.get('https://asu.instructure.com/api/v1/users/self/enrollments', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => (name = res.data[0]))
		.catch((err) => console.log(err))
}

getEnrollments()
app.get('/', (req, res) => {
	res.send(name)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

//starter file for the backend
//starter file

const { S_IFDIR } = require('constants')
const http = require('http')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('Hello world!')
})

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})

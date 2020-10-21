const http = require('http')

//key: 3a672dc3e7a84eb490a11b47a1687683
http.get(
	'http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3a672dc3e7a84eb490a11b47a1687683',
	(resp) => {
		let data = ''

		// a chunk of data has been received
		resp.on('data', (chunk) => {
			data += chunk
		})

		//the whole response has been received. print the result
		resp.on('end', () => {
			let result = JSON.parse(data)
			console.log(result.articles[0])
		})
	}
)

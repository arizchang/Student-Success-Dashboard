const express = require('express')
const axios = require('axios')
const personal_token = require('./tokens').token
const the_client_id = require('./tokens').client_id
const the_client_secret = require('./tokens').client_secret

const app = express()

// OAuth2
app.get('/auth', (req, res) => {
	res.redirect(
		`https://canvas-dev.asu.edu/login/oauth2/auth?client_id=${the_client_id}&response_type=code&redirect_uri=http://localhost:3000/oauth_callback&scope=/auth/userinfo url:GET|/api/v1/users/:user_id/history`
	)
})

// callback
app.get('/oauth_callback', ({ query: { code } }, res) => {
	const body = {
		grant_type: 'authorization_code',
		client_id: the_client_id,
		client_secret: the_client_secret,
		redirect_uri: 'http://localhost:3000/oauth_callback',
		code: code,
	}
	axios
		.post('https://canvas-dev.asu.edu/login/oauth2/token', body)
		.then((res) => res.data.access_token)
		.then((token) => {
			console.log('My token:', token)

			res.redirect(`/?token=${token}`)
		})
		.catch((err) => res.status(500).json({ err: err.message }))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

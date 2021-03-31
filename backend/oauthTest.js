const express = require('express')
const axios = require('axios')
const token = require('./tokens').token
const client_id = require('./tokens').client_id

const app = express()

// OAuth2
app.get('/auth', (req, res) => {
	res.redirect(
		`https://canvas-dev.asu.edu/login/oauth2/auth?client_id=${client_id}&response_type=code&redirect_uri=http://localhost:3000/oauth_callback&scope=/auth/userinfo`
	)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

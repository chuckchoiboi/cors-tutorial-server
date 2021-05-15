/* NOTE External Modules */
const express = require('express')

/* NOTE Internal Modules */
const logger = require('./middleware/logger')

/* NOTE PORT */
const PORT = process.env.PORT || 3000

/* NOTE App Instance */
const app = express()

/* NOTE Middleware */
app.use( logger )


/* NOTE Routes */

    // NOTE Same-origin Test Page
        app.get('/', (req, res) => {
            res.send('<h1>Open your browser console, and put the following in the console:</h1>\n<code style="color: #C7254E; background: #F9F2F4; margin-left: 20px; padding: 10px;">fetch("https://cors-tutorial-server.herokuapp.com/api/simple/no-origin")</code>')
        })

    // NOTE Simple Request

        // no-header
        app.get('/api/simple/no-origin', (req, res) => {
            res.status(200).json({ title: 'Hello World!' })
        })

        // wildcard
        app.get('/api/simple/wildcard-origin', (req, res) => {
            res.header("Access-Control-Allow-Origin", "*")
            res.status(200).json({ title: 'Hello World!' })
        })

        // not equal to supplied origin
        app.get('/api/simple/bad-origin', (req, res) => {
            res.header("Access-Control-Allow-Origin", "https://www.website.notcool")
            res.status(200).json({ title: 'Hello World!' })
        })

        // origin matching
        app.get('/api/simple/good-origin', (req, res) => {
            res.header("Access-Control-Allow-Origin", "https://chuckchoiboi.github.io")
            res.status(200).json({ title: 'Hello World!' })
        })

    // NOTE Preflight request
        // options origin not matching
        app.options('/api/preflight/bad-origin', (req, res) => {
            res.header("Access-Control-Allow-Origin", "https://www.website.notcool")
            res.status(204).end()
        })

        // options origin matching, but method not listed
        app.options('/api/preflight/bad-method', (req, res) => {
            res.header("Access-Control-Allow-Origin", "https://chuckchoiboi.github.io")
            res.status(204).end()
        })

        // options origin matching, method listed, but delete route's origin not matching
        app.options('/api/preflight/req-bad-origin', (req, res) => {
            res.header("Access-Control-Allow-Origin", "https://chuckchoiboi.github.io")
            res.header("Access-Control-Allow-Methods", "DELETE")
            res.status(204).end()
        })

        app.delete('/api/preflight/req-bad-origin', (req, res) => {
            res.header("Access-Control-Allow-Origin", "https://www.website.notcool")
            res.status(200).json({ title: 'Goodbye World!' })
        })

        // options header matching, method listed, delete route's origin matching

        app.options('/api/preflight/good-request', (req, res) => {
            res.header("Access-Control-Allow-Origin", "https://chuckchoiboi.github.io")
            res.header("Access-Control-Allow-Methods", "DELETE")
            res.status(204).end()
        })
        
        app.delete('/api/preflight/good-request', (req, res) => {
            res.header("Access-Control-Allow-Origin", "https://chuckchoiboi.github.io")
            res.status(200).json({ title: 'Goodbye World!' })
        })

    // NOTE Credentialed Request

        // wildcard, second request with credentials include (Front-end should send a request with {credentials: 'include'} added to the request )
        app.get('/api/credentialed/wildcard-origin', (req, res) => {
            res.header("Access-Control-Allow-Origin", "*")
            res.status(200).json({ title: 'Hello World!' })
        })

        // origin matching, but Access-Controls-Allow-Credentials missing
        app.get('/api/credentialed/good-origin', (req, res) => {
            res.header("Access-Control-Allow-Origin", "https://chuckchoiboi.github.io")
            res.status(200).json({ title: 'Hello World!' })
        })

        // origin matching, Access-Controls-Allow-Credentials set to true
        app.get('/api/credentialed/good-request', (req, res) => {
            res.header("Access-Control-Allow-Origin", "https://chuckchoiboi.github.io")
            res.header("Access-Control-Allow-Credentials", "true")
            res.status(200).json({ title: 'Hello World!' })
        })


/* NOTE App Listening */
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
})
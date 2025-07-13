//loading the express module wich return a function named expres
const express = require("express")
//call of the function that return an object of type express, by convention that object is called app
//the object app got a bunch of useful methods like get(), put(), post(), delete()
const app = express()

/*implementing endpoints that respond to http get request, that methods gonna get two arguments: the path or the url and the callback method wich is the function that we gonna call when we have an http request*/
app.get('/', (req, res) => {
    /*the object req above has a bunch f methods that give us information about the incoming request. the res object define the response given after a http request*/
    res.send('Hello world')
})

app.get('/api/courses', (req, res) => {
    res.send([1,2,3])
})

//PORT is an environment variable which tell on wich port a process run. that what we gonna use here instead of fixing the port with the value 3000
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))

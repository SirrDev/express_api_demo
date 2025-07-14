//this return a class
const Joi = require('joi')
//loading the express module wich return a function named expres
const express = require("express")
//call of the function that return an object of type express, by convention that object is called app
//the object app got a bunch of useful methods like get(), put(), post(), delete()
const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: "course 1"},
    {id: 2, name: "course 2"},
    {id: 3, name: "course 3"},
]

/*implementing endpoints that respond to http get request, that methods gonna get two arguments: the path or the url and the callback method wich is the function that we gonna call when we have an http request*/
app.get('/', (req, res) => {
    /*the object req above has a bunch f methods that give us information about the incoming request. the res object define the response given after a http request*/
    res.send('Hello world')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.post('/api/courses', (req, res) => {
    /*deining a schema wich define the shape of our object like the properties we gonna have in it, theirs types, the min or max number of characters, do we have emails or stings etc...*/
   const { error } = validateCourse(req.body) //result.error

    //if invalid, return 400 - Bad Request
    if(error){
        // 400 Bad Request
        res.status(400).send(error.details[0].message)
        return
    }

    // creating a course object, note that here we working manually without a database
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    // pushing the new object in the array courses
    courses.push(course)
    //returning the object in the body of the response, by convention it should always be this way
    res.send(course)
}) 

app.put('/api/courses/:id', (req, res) => {
    //look up the course, if not exist, return 404
     const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) {
        res.status(404).send('The course with the given ID was not found.')
        return
    }

    //validate
    /*check the function validateCourse*/
    const { error } = validateCourse(req.body) //result.error

    //if invalid, return 400 - Bad Request
    if(error){
        // 400 Bad Request
        res.status(400).send(error.details[0].message)
        return
    }

    //update the course
    course.name = req.body.name
    //return the updated course
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    //look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found')

        //delete
        courses.indexOf(course)
        courses.splice(index, 1)

        //return the same course that we deleted
        res.send(course)

})

//defining a route to get a specific course with its id
app.get('/api/courses/:id', (req, res) => {
    //to read the parameter id, we use the req object
    /*using query string parameters with query, it's for optional parameter that are not essential # raw params, ex:?sortedBy=name*/
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found.')
        
    res.send(course)

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.valid(course, schema)
}

/*PORT is an environment variable which tell on wich port a process run. that what we gonna use here instead of fixing the port with the value 3000*/
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))

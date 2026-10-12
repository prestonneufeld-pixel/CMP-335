const express = require('express');
const app = express();

// Enable JSON parsing middleware for request bodies
app.use(express.json());

// In-memory array of course resources
const courses = [
    { id: 1, name: 'charmander', element: "fire", evolution: "base" },
    { id: 2, name: 'squirtle', element: "water", evolution: "base" },
    { id: 3, name: 'pikachu', element: "electric", evolution: "base" }
];

// GET: Root endpoint
app.get('/', (req, res) => {
    res.send('Hello World');
});

// GET: Retrieve all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// GET: Retrieve a single course by ID
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

// POST: Create a new course
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        element: req.body.element,
        evolution: req.body.evolution
    };
    courses.push(course);
    res.send(course);
});

// PUT: Update an existing course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    course.name = req.body.name;
    course.element = req.body.element;
    course.evolution = req.body.evolution;
    res.send(course);
});

// DELETE: Delete a course by ID
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

// Environment port configuration or dynamic fallback to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
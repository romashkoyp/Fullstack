const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data', {
    stream: process.stdout
  }))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/api/persons/', (request, response) => {
    if (persons) {
        response.json(persons)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const currentTime = new Date().toString()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${currentTime}</p>`
        )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = persons.length > 0
    ? () => {
        function getRandomInt(min, max) {
            min = Math.ceil(persons.length)
            max = Math.floor(5000)
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        return getRandomInt()
    }
    : () => 0

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'The name or number is missing' 
        })
    } else if (persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({ 
            error: 'The name already exists in the phonebook' 
        })  
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }
  
    persons = persons.concat(person)
    response.json(person)
})

morgan.token('post-data', (req, res) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body)
    }
    return ''
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
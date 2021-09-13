require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const Entry = require('./models/entry')
//var morgan = require('morgan')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use(cors())


app.get('/api/persons', (request, response) => {
    Entry.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Entry.findById(request.params.id)
        .then(note => {
            response.json(note)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Entry.find({}).then(notes => {
        const info =
        `<p>Phonebook has info for ${notes.length} people</p>
        <p>${new Date()}</p>`
        response.send(info)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Entry.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})
/*
const id = () => {
    min = Math.ceil(1)
    max = Math.floor(100001)
    return Math.floor(Math.random() * (max - min) + min)
}
*/
//app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :data'))

app.post('/api/persons/', (request, response, next) => {
    const body = request.body

    // morgan.token('data', function (request, response) {
    //     return JSON.stringify(body)
    // })

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const entry = new Entry({
        name: body.name,
        number: body.number,
    })

    entry
        .save()
        .then(savedEntry =>  response.json(savedEntry))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    if (body.name.length < 3) {
        return response.status(400).send({ error: 'name should be at least 3 characters long.' })
    } else if (body.number.length < 8) {
        return response.status(400).send({ error: 'number should be at least 8 characters long.' })
    }

    Entry.findOneAndUpdate({ name: body.name }, { number: body.number }, { new: true })
        .then(updatedEntry => {
            response.json(updatedEntry)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
const express = require('express')
const cors = require('cors')
const app = express()



app.use(express.json())

app.use(express.static('build'))

app.use(cors())




// const requestLogger = (request, response, next) => {
//     console.log('Method :', request.method);
//     console.log('Path: ', request.path);
//     console.log('Body: ', request.body);
//     console.log('---');
//     next()
// }

// app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}





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



app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people
                   <p>${Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
	response.json(person)
    }
    else{
        response.status(404).end();
    } 
})

app.post('/api/persons', (req, res) => {
    console.log('got the req');
    const body = req.body
    if(!body.name){
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if(!body.number){
        return res.status(400).json({
            error: 'number missing'
        })
    }
    if(persons.some(p => p.name === body.name)){
        return res.status(400).json({
            error: 'names must be unique'
        })
    }


    const person = {
        id: Math.floor(Math.random() * 50000) + 1,
        name: body.name,
        number: body.number,
        
    }
    

    persons = persons.concat(person)

    res.json(person)
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    
    
	persons = persons.filter(n => n.id !== id)
    response.status(204).end()
    
})

app.use(unknownEndpoint)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
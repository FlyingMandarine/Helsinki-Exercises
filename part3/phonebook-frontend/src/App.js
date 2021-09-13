import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons.js'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ textField, setTextField ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addEntry = (e) => {
    e.preventDefault()

    for (var i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const changedPerson = { ...persons[i], number: newNumber }

          personService
            .update(persons[i].id, changedPerson)
            .then(returnedObject => {
              console.log(returnedObject, 'has been updated successfully.');
              
              const newPersons = persons.filter(person => person.id !== returnedObject.id)
              
              setPersons(newPersons.concat(returnedObject))
              
              setMessage(`Changed number for ${returnedObject.name}`)
              
              setTimeout(() => {
                setMessage(null)
              }, 3000)
            })
            .catch((error) => {
              setError(error.response.data.error)

              //setError(`The information of ${changedPerson.name} has already been removed from the server.`)

              setTimeout(() => {
                setError(null)
              }, 3000)
            })
        }
        setNewName('')
        setNewNumber('')
        return
      }
    }

    const newObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newObject)
      .then(returnedObject => {
        console.log(returnedObject, 'added successfully.')
        
        setPersons(persons.concat(returnedObject))

        setMessage(`Added ${returnedObject.name}`)
        
        setTimeout(() => {
          setMessage(null)
        }, 3000)

        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setError(error.response.data.error)

        setTimeout(() => {
          setError(null)
        }, 3000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const entriesToShow = () => {
    if (setTextField === '') {
      return persons
    } else {
      return persons.filter(person => person.name.toLowerCase().indexOf(textField.toLowerCase()) !== -1)
    }
  }

  const deleteEntry = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
      .remove(id)
      .then(() => {
        console.log('Entry deleted successfully.')
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />
      <Error error={error} />
      <Filter setTextField={setTextField} />
      
      <h3>Add a new</h3>
      
      <PersonForm
        handleSubmit={addEntry}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons entriesToShow={entriesToShow} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App
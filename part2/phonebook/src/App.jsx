import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
  
    if (newName.trim() === '' || newNumber.trim() === '') {
      alert('Please enter both name and number')
      return
    }
  
    const existingPerson = persons.find((person) => person.name === newName)
  
    const processPerson = (personData) => {
      setPersons((prevPersons) => {
        const updatedPersons = prevPersons.map((person) =>
          person.id === personData.id ? personData : person
        )
        return updatedPersons.some((person) => person.id === personData.id)
          ? prevPersons
          : prevPersons.concat(personData)
      })
      setNewName('') // remove name from the input field
      setNewNumber('') // remove number from the input field
      console.log(personData)
    }
  
    if (existingPerson) {
      const numberReplace = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      )
  
      if (numberReplace) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber,
        }
  
        personService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            const updatedPersons = persons.map((person) =>
              person.id === existingPerson.id ? response.data : person
            )
            setPersons(updatedPersons)
            processPerson(response.data)
          })
          .catch((error) => {
            console.error('Error updating record:', error)
          })
      }
    } else {
      const newRecord = {
        name: newName,
        number: newNumber,
      }
  
      personService
        .create(newRecord)
        .then((response) => {
          processPerson(response.data)
        })
        .catch((error) => {
          console.error('Error creating record:', error)
        })
    }
  }
   
  const deleteRecord = (id, person) => {
    if (window.confirm(`Delete current record with name ${person.name} and number ${person.number}?`)) {
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error('Error deleting record:', error)
      }) 
    } else {
        return
    }
  }

  const dataToShow = showAll
  ? persons
  : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
      filter={filter}
      handleFilterChange={handleFilterChange} /> 

      <h3>Add a new</h3>

      <PersonForm 
      addName={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons dataToShow={dataToShow} deleteRecord={deleteRecord} />
    </div>
  )
}

export default App
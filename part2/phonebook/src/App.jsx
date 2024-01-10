import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  const addName = (event) => {
    event.preventDefault()
    
    if (newName.trim() === '' || newNumber.trim() == '') {
      alert('Please enter both name and number')
      return
    }
    
    const isDuplicate = persons.some(person => person.name === newName || person.number == newNumber)

    if (isDuplicate) {
      alert(newName + ' or ' + newNumber + ' is already added to phonebook')
    } else {
      const newRecord = {
        name: newName,
        number: newNumber
      }
    
      setPersons(persons.concat(newRecord))
      setNewName('')
      setNewNumber('') 
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

      <Persons dataToShow={dataToShow} />
    </div>
  )
}

export default App
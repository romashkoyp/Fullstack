import ReactDOM from 'react-dom/client'

import App from './App'

const persons = [
  {
    name: 'Arto Hellas',
    number: 121234421
  },
  {
    name: 'Second Name',
    number: 121234232
  },
]

ReactDOM.createRoot(document.getElementById('root')).render(<App persons={persons} />)
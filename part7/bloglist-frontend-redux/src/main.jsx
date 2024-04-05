import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import store from './reducers/store'
import GlobalStyles from './components/styles/GlobalStyle'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  )
  
  export default store
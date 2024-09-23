import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StorageContextProvider from './context/StorageContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StorageContextProvider>
      <App />

    </StorageContextProvider>
  </BrowserRouter>
)

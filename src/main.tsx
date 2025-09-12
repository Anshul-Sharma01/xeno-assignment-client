import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { hydrateAuth } from './redux/slices/authSlice.ts'
import { Toaster } from 'react-hot-toast'

store.dispatch < any > ( hydrateAuth() );

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
    <Toaster position='top-center'/>
      <App />
    </BrowserRouter>
  </Provider>
)

import { createRoot } from 'react-dom/client'
import './index.css'
import { RecoilRoot } from 'recoil';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
)

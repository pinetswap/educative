import { StrictMode } from "react"
import App2 from './App'
import './index.css'
import{createRoot} from "react-dom/client"
const root=createRoot(document.getElementById('root'))
root.render(
     <StrictMode>
     <App2/>
     </StrictMode>

)
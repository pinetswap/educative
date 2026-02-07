import Navbar from "./components/Navbar";
import Demo from "./pages/Demo";
import {Themewrapper} from './components/themewrapper'


const App =()=>{
   

    return(
       
          <Themewrapper>
          <Navbar/>
           <Demo/>
        

          </Themewrapper> 
      

      
       
    )
}

export default App;

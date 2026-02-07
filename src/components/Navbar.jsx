// import './navbar.css'
import{usetheme} from './themewrapper'
const Navbar=()=>{
    const {toggletheme }=usetheme()
return(
    <nav style={{backgroundColor:"#8df" , height:"3vh",display:"flex",justifyContent:"space-between",color:"white"}}>
      
        <div style={{display:"flex", gap:"6px"}}>
            logo
             <div onClick={toggletheme} >Kevo</div>
        </div>
       
        <nav style={{display:"flex", width:"60%", gap:"8px"}}>
            <a href="">home</a>
            <a href="">home</a>
            <a href="">home</a>

        </nav>
        {/* <div></div> */}

  
     </nav>
)
   
   
}
export default Navbar
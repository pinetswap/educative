import {  createContext, useContext , useState} from "react"

const themeContext= createContext();
export const usetheme=()=>useContext(themeContext);

export const Themewrapper= ({children})=>{
       const [theme,settheme]=useState('light')

        const toggletheme =()=>{
            settheme(
                (t)=>(t==='light'? 'dark':'light' )
            )
        }
         const value={theme,toggletheme}
    return (
        <themeContext.Provider value={value}>
            <div className={theme==="light"? "bg-green-500":"bg-slate-700"}>
                {children}
            </div>
        </themeContext.Provider>
    )

}

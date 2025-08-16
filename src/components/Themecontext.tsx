'use client'

import { Theme } from "@radix-ui/themes";
import { ChartLine } from "lucide-react";
import { createContext, ReactNode, useState } from "react"
import Header from "./Header";
export const themecontext=createContext<
{
    isdark:boolean,
    setisdark:(x:boolean)=>void

}
>({isdark:true,
    setisdark:()=>{}
})
function Themecontext({children}:{children:ReactNode}) {
    const[isdark,setisdark]=useState(true);
  return (

        <themecontext.Provider value={{isdark,setisdark}}>
         <Theme appearance={isdark?"dark":"light"}>
          
            {children}
         </Theme>
        </themecontext.Provider>
 
  )
}

export default Themecontext

'use client'

import { logout } from "@/lib/gql/queries"
import gqlclient from "@/lib/services/gql"
import { LogOut } from "lucide-react"


function Logout() {
    async function handlelogout(){
       try{
        const resp=await gqlclient.request(logout)
        window.location.href="/login"
       }
       catch(e:any){
        alert("failed to logout!")
       }
    }
  return (
    <div>
      <button onClick={handlelogout}>Logout</button>
    </div>
  )
}

export default Logout

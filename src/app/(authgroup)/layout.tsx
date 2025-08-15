import { getuserfromcookies } from '@/helper'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import Usercontext from '@/components/userComponents/Usercontext';
import Header from '@/components/Header';
async function layout({children}:{children:ReactNode}) {
    const user=await getuserfromcookies();
    if(!user)redirect("/login")
  return (
    <div>
     <Usercontext children={children} user={user}/>
    </div>
  )
}

export default layout

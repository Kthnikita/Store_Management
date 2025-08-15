'use client'
import React, { createContext, ReactNode } from 'react'
import { user } from '../../../generated/prisma';
import Header from '../Header';
export const usercontext=createContext<{
    user?:user
}>({});
function Usercontext({children,user}:{children:ReactNode,user:user}) {
  return (
    <div>
      <usercontext.Provider value={{user}}>
        <Header/>
        {children}
      </usercontext.Provider>
    </div>
  )
}

export default Usercontext

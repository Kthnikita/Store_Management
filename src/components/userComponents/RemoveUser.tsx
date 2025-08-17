'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React, { useContext } from 'react'
import { X } from 'lucide-react'
import gqlclient from '@/lib/services/gql'
import { Removeuser } from '@/lib/gql/mutation'
import { usercontext } from './Usercontext'

function RemoveUser({id}:{id:string}) {
    const {user}=useContext(usercontext)
    async function handleremove(){
        try{
            const resp:{removeuser:boolean}=await gqlclient.request(Removeuser,{
              removeuserId:id
            })
            if(resp?.removeuser){
                alert("removed")
            }
        }
        catch(e:any){
            alert("failed")
        }
    }
    if(user?.role!="Admin")return null
  return (
    <div>
      <AlertDialog.Root>
	<AlertDialog.Trigger>
		<button style={{cursor:"pointer"}}><X size={16}/></button>
	</AlertDialog.Trigger>
	<AlertDialog.Content maxWidth="450px">
		<AlertDialog.Title>Remove user</AlertDialog.Title>
		<AlertDialog.Description size="2">
			Are you sure? you want to remove this user.
		</AlertDialog.Description>

		<Flex gap="3" mt="4" justify="end">
			<AlertDialog.Cancel>
				<Button variant="soft" color="gray" style={{cursor:"pointer"}}>
					Cancel
				</Button>
			</AlertDialog.Cancel>
			<AlertDialog.Action asChild>
  <button 
    onClick={handleremove} 
    className="px-3 py-1 bg-red-600 text-white rounded"
    style={{cursor:"pointer"}}
  >
    Remove
  </button>
</AlertDialog.Action>
		</Flex>
	</AlertDialog.Content>
</AlertDialog.Root>

    </div>
  )
}

export default RemoveUser

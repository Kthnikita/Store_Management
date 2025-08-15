'use client'
import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'
import React, { useContext, useState } from 'react'
import { Pencil } from 'lucide-react';
import gqlclient from '@/lib/services/gql';
import { user } from '../../../generated/prisma';
import { usercontext } from './Usercontext';
import { updateuser } from '@/lib/gql/mutation';
function Edituser({userid}:{userid:string}) {
    const {user}=useContext(usercontext)
	const[name,setname]=useState("");
	const[username,setusername]=useState("");
	const[email,setemail]=useState("");
	const[avatar,setavatar]=useState("");
	async function handelupdateuser() {
		try{
            const resp:{updateuserprofile:user}=await gqlclient.request(updateuser,{
                userid,
                name,
                email,
                username,
                avatar
            })
            if(resp?.updateuserprofile){
                alert("updated!");
            }
        }
        catch(e:any){
            alert("showry :/")
        }
	}
    if(user?.id!=userid && user?.role!="Admin")return null
  return (
    <div>
      <Dialog.Root>
	<Dialog.Trigger>
		<button><Pencil size={20}/></button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>Update Member</Dialog.Title>

		<Flex direction="column" gap="3">
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Name
				</Text>
				<TextField.Root
					value={name}
					placeholder="Enter your full name"
					onChange={(e)=>setname(e.target.value)}
				/>
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Email
				</Text>
				<TextField.Root
					value={email}
					placeholder="Enter your email"
					onChange={(e)=>setemail(e.target.value)}
				/>
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Username
				</Text>
				<TextField.Root
					value={username}
					placeholder="Enter your email"
					onChange={(e)=>setusername(e.target.value)}
				/>
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Avatar
				</Text>
				<TextField.Root
					value={avatar}
					placeholder="Enter your email"
					onChange={(e)=>setavatar(e.target.value)}
				/>
			</label>
			
		</Flex>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button onClick={handelupdateuser}>Update</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

    </div>
  )
}

export default Edituser

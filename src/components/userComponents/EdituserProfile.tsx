'use client'
import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'
import React, { useContext, useState } from 'react'
import { Pencil } from 'lucide-react';
import gqlclient from '@/lib/services/gql';
import { user } from '../../../generated/prisma';
import { usercontext } from './Usercontext';
import { updateuser } from '@/lib/gql/mutation';

function Edituser({userdata}:{userdata:user}) {
    const {user}=useContext(usercontext)
	const[name,setname]=useState(userdata.name);
	const[username,setusername]=useState(userdata.username);
	const[email,setemail]=useState(userdata.email);
	const[avatar,setavatar]=useState(userdata.avatar || "");

	async function handelupdateuser() {
		try{
            const resp:{updateuserprofile:user}=await gqlclient.request(updateuser,{
                userid:userdata?.id,
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

    if(user?.id!=userdata.id && user?.role!="Admin")return null

  return (
    <div>
      <Dialog.Root>
	<Dialog.Trigger>
		<button style={{cursor:"pointer"}}><Pencil size={16}/></button>
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
					style={{cursor:"text"}}
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
					style={{cursor:"text"}}
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
					style={{cursor:"text"}}
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
					style={{cursor:"text"}}
				/>
			</label>
			
		</Flex>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray" style={{cursor:"pointer"}}>
					Cancel
				</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button onClick={handelupdateuser} style={{cursor:"pointer"}}>
					Update
				</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

    </div>
  )
}

export default Edituser

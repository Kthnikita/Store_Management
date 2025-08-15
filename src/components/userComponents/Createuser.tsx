'use client'
import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { createuser } from '@/lib/gql/mutation';
import gqlclient from '@/lib/services/gql';
import { user } from '../../../generated/prisma';
function Createuser() {
	const[name,setname]=useState("");
	const[username,setusername]=useState("");
	const[email,setemail]=useState("");
	const[password,setpassword]=useState("");
	const[role,setrole]=useState("Staff");
	async function handelcreateuser() {
		try{
         const newuser:{createuser:user}=await gqlclient.request(createuser,{
			name,
			username,
			createuserPassword2:password,
			email,
			role
		 })
		 if(newuser?.createuser){
			alert("created")
		 }
		}
		catch(e:any){
            alert("invalid");
		}
	}
  return (
    <div>
      <Dialog.Root>
	<Dialog.Trigger>
		<Button>Add Member</Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>Add Member</Dialog.Title>

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
					Usernmae
				</Text>
				<TextField.Root
					value={username}
					placeholder="Enter your email"
					onChange={(e)=>setusername(e.target.value)}
				/>
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					password
				</Text>
				<TextField.Root
					value={password}
					placeholder="Enter your email"
					onChange={(e)=>setpassword(e.target.value)}
				/>
			</label>
			<Select.Root value={role} onValueChange={(value)=>setrole(value)}>
	<Select.Trigger />
	<Select.Content>
		<Select.Group>
			<Select.Label>Role</Select.Label>
			<Select.Item value="Manager">Manager</Select.Item>
			<Select.Item value="Staff">Staff</Select.Item>
		</Select.Group>
	</Select.Content>
</Select.Root>
			
		</Flex>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button onClick={handelcreateuser}>Add</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

    </div>
  )
}

export default Createuser

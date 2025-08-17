'use client'
import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { createuser } from '@/lib/gql/mutation';
import gqlclient from '@/lib/services/gql';
import { user } from '../../../generated/prisma';

function Createuser() {
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("Staff");

  async function handelcreateuser() {
    try {
      const newuser: { createuser: user } = await gqlclient.request(createuser, {
        name,
        username,
        createuserPassword2: password,
        email,
        role
      })
      if (newuser?.createuser) {
        alert("created")
      }
    } catch (e: any) {
      alert("invalid");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button style={{ cursor: "pointer"}}>
          Add Member
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px" style={{ borderRadius: "10px", padding: "20px" }}>
        <Dialog.Title style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          Add Member
        </Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">Name</Text>
            <TextField.Root
              style={{ cursor: "text", padding: "6px" }}
              value={name}
              placeholder="Enter your full name"
              onChange={(e) => setname(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">Email</Text>
            <TextField.Root
              style={{ cursor: "text", padding: "6px" }}
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setemail(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">Username</Text>
            <TextField.Root
              style={{ cursor: "text", padding: "6px" }}
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setusername(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">Password</Text>
            <TextField.Root
              type="password"
              style={{ cursor: "text", padding: "6px" }}
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </label>

          <Select.Root value={role} onValueChange={(value) => setrole(value)}>
            <Select.Trigger style={{ cursor: "pointer", padding: "6px", borderRadius: "6px" }} />
            <Select.Content>
              <Select.Group>
                <Select.Label>Role</Select.Label>
                <Select.Item style={{ cursor: "pointer" }} value="Manager">Manager</Select.Item>
                <Select.Item style={{ cursor: "pointer" }} value="Staff">Staff</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button style={{ cursor: "pointer" }} variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button style={{ cursor: "pointer" }} onClick={handelcreateuser}>
              Add
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Createuser

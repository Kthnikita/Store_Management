'use client'
import { updaterole } from '@/lib/gql/mutation';
import gqlclient from '@/lib/services/gql';
import { Select, IconButton, Flex, Dialog, Button } from '@radix-ui/themes';
import { UserCog, UserRoundCog } from 'lucide-react';
import React, { useState } from 'react';

function UpdateuserRole({ userid, defaultRole = "Staff" }: { userid: string, defaultRole?: string }) {
  const [role, setrole] = useState(defaultRole);
  const [loading, setLoading] = useState(false);

  async function handelrole() {
    try {
      setLoading(true);
      const resp: { updateuserrole: boolean } = await gqlclient.request(updaterole, {
        userid,
        role,
      });
      if (resp?.updateuserrole) {
        alert(`Role updated(${role})`);
      }
    } catch (e: any) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
  
      <Dialog.Root>
	<Dialog.Trigger>
		<button className='cursor-pointer' title="Change role"><UserRoundCog size={16}/></button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>change Role</Dialog.Title>
		<Flex direction="column" gap="3">
			 <Select.Root value={role} onValueChange={(value) => setrole(value)}>
        <Select.Trigger style={{ cursor: "pointer" }} />
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
				<Button onClick={handelrole}>Change</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

  );
}

export default UpdateuserRole;

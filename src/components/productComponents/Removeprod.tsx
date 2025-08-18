
"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React, { useContext } from "react";
import gqlclient from "@/lib/services/gql";
import { removeProd } from "@/lib/gql/mutation";
import { Trash } from "lucide-react";
import { usercontext } from "../userComponents/Usercontext";
function Removeprod({ id }: { id: string }) {
  const { user } = useContext(usercontext);
  async function handleremove() {
    try {
      const resp: { removeprod: boolean } = await gqlclient.request(
        removeProd,
        {
          removeprodId: id,
        }
      );
      if (resp?.removeprod) {
        alert("removed");
      }
    } catch (e: any) {
      alert("failed");
    }
  }
  if (user?.role != "Manager") return null;
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button>
            <Trash size={20} />
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Remove Product</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? you want to remove this Product.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                onClick={handleremove}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Remove
              </Button>
            </AlertDialog.Action>
          
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}

export default Removeprod;

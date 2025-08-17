"use client";
import Createuser from "./userComponents/Createuser";
import gqlclient from "@/lib/services/gql";
import { finduser, getusers } from "@/lib/gql/queries";
import { user } from "../../generated/prisma";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Text,
  Heading,
  Separator,
  ScrollArea,
  TextField,
  Select,
  Button,
} from "@radix-ui/themes";
import Allproducts from "./productComponents/Allproducts";
import Addproduct from "./productComponents/Addproduct";
import Edituser from "./userComponents/EdituserProfile";
import RemoveUser from "./userComponents/RemoveUser";
import { useContext, useEffect, useMemo, useState } from "react";
import { usercontext } from "./userComponents/Usercontext";
import { Search, SearchIcon, X } from "lucide-react";
import UpdateuserRole from "./userComponents/UpdateuserRole";

function Admin() {
  const { user } = useContext(usercontext);
  const [users, setusers] = useState<user[] | []>([]);
  const [input, setinput] = useState("");
  const [role, setrole] = useState("staff");
  const[sidepanel,setpanel]=useState(false);
  async function handeluser() {
    try {
      const resp: { searchuser: user[] } = await gqlclient.request(finduser, {
        cred: input,
        role,
      });
      if (resp?.searchuser) {
        setusers(resp?.searchuser || []);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }
  useEffect(() => {
    async function getuser() {
      const data: { getalluser: user[] } = await gqlclient.request(getusers);
      setusers(data.getalluser || []);
    }
    getuser();
  }, []);

  // const filteruser = useMemo(() => {
  //   return users?.filter((elm) =>
  //     elm.name.toLowerCase().includes(input.toLowerCase())
  //   );
  // }, [input, users]);

  return (
    <div className="p-4 sm:p-6">
      <main className="flex lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {user?.role === "Manager" && (
            <section>
              <Heading size="4" mb="3">
                Add Product
              </Heading>
              <Separator size="4" mb="4" />
              <Addproduct />
            </section>
          )}

          <section>
            <Heading size="4" mb="3">
              All Products
            </Heading>
            <Separator size="4" mb="4" />
            <Allproducts />
          </section>
        </div>

        {(user?.role === "Admin" || user?.role === "Manager") && (
          <div className={`w-full lg:w-[320px] flex-col gap-6 
  ${sidepanel ? "flex fixed top-0 right-0 h-full bg-black z-50 p-4 " : "hidden lg:flex"}`}>
            {user?.role === "Admin" && (
              <section>
                <Heading size="4" mb="3" className="flex">
                  Create User
                   <button
                  className=" ml-auto hover:bg-red-600 text-center md:hidden"
                  aria-label="Close users panel"
                  onClick={() => setpanel(false)}
                >
                <X/>
                </button>
                </Heading>
                <Separator size="4" mb="4" />
                <Createuser />
              </section>
            )}

            <section className="flex-1">
              <Heading size="4" mb="3">
                All Users
              </Heading>
              <Separator size="4" mb="4" />

              <div className="flex gap-2">
                <TextField.Root
                  placeholder="Search member…"
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
                >
                  <TextField.Slot>
                    <Search />
                  </TextField.Slot>
                </TextField.Root>
                <Select.Root
                  value={role}
                  onValueChange={(value) => setrole(value)}
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Sort By Role</Select.Label>
                      <Select.Item value="Staff">Staff</Select.Item>
                      <Select.Item value="Manager">Manager</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
                <button onClick={handeluser}>
                  <SearchIcon />
                </button>
              </div>

              <ScrollArea
                type="always"
                scrollbars="vertical"
                className="mt-3"
                style={{ height: 350 }}
              >
                <Box p="2" pr="8">
                  <Flex direction="column" gap="4">
                      {users.length === 0 && (
                <div className="text-sm text-neutral-500 px-2">No users found.</div>
              )}
                    {users.map((val) => (
                      <Box key={val.id}>
                        <Card>
                          <Flex gap="3" align="center" justify="between">
                            <Flex gap="2" align="center">
                              <Avatar
                                size="3"
                                src=""
                                radius="full"
                                fallback={val.name[0] || "U"}
                              />
                              <Box>
                                <Text as="div" size="2" weight="bold">
                                  {val.name}
                                </Text>
                                <Text as="div" size="2" color="gray">
                                  {val.role}
                                </Text>
                              </Box>
                            </Flex>
                            <Flex gap="2">
                              <Edituser userdata={val} />
                              {user?.role == "Admin" && (
                                <UpdateuserRole userid={val.id} />
                              )}
                              <RemoveUser id={val.id} />
                            </Flex>
                          </Flex>
                        </Card>
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </ScrollArea>
            </section>
            
          </div>
          
        )}
         <button
    className="md:hidden fixed bottom-4 right-4 z-40 rounded-full bg-blue-600 text-white h-12 w-12 shadow-lg "
    aria-label="Open users panel"
    onClick={() => setpanel(true)}
    title="Open users panel"
  >
    ☰
  </button>
      </main>
    </div>
  );
}

export default Admin;

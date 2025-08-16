"use client";
import Createuser from "./userComponents/Createuser";
import gqlclient from "@/lib/services/gql";
import { getusers } from "@/lib/gql/queries";
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
} from "@radix-ui/themes";
import Allproducts from "./productComponents/Allproducts";
import Addproduct from "./productComponents/Addproduct";
import Edituser from "./userComponents/EdituserProfile";
import RemoveUser from "./userComponents/RemoveUser";
import { useContext, useEffect, useMemo, useState } from "react";
import { usercontext } from "./userComponents/Usercontext";
import { Search } from "lucide-react";

function Admin() {
  const { user } = useContext(usercontext);
  const [users, setusers] = useState<user[] | []>([]);
  const [input, setinput] = useState("");

  useEffect(() => {
    async function getuser() {
      const data: { getalluser: user[] } = await gqlclient.request(getusers);
      setusers(data.getalluser || []);
    }
    getuser();
  }, []);

  const filteruser = useMemo(() => {
    return users?.filter((elm) =>
      elm.name.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, users]);

  return (
    <div className="p-4 sm:p-6">
     
      <main className="flex flex-col lg:flex-row gap-6">
    
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
          <div className="w-full lg:w-[320px] flex flex-col gap-6">
            
            {user?.role === "Admin" && (
              <section>
                <Heading size="4" mb="3">
                  Create User
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

              <TextField.Root
                placeholder="Search member…"
                value={input}
                onChange={(e) => setinput(e.target.value)}
              >
                <TextField.Slot>
                  <Search />
                </TextField.Slot>
              </TextField.Root>

                <ScrollArea
                  type="always"
                  scrollbars="vertical"
                  className="mt-3"
                  style={{ height: 400 }}
                >
                  <Box p="2" pr="8">
                    <Flex direction="column" gap="4">
                      {}
                      {filteruser.map((val) => (
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
                                <Edituser userid={val.id} />
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
      </main>
    </div>
  );
}

export default Admin;

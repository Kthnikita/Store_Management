'use client'

import { useContext } from "react";
import { usercontext } from "./userComponents/Usercontext";
import { themecontext } from "./Themecontext";
import { Avatar, Box, Card, Flex, Switch, Text } from "@radix-ui/themes";
import Logout from "./userComponents/logout";
function Header() {
  const { user } = useContext(usercontext);
  const { isdark, setisdark } = useContext(themecontext);

  return (
    <header className="flex justify-between items-center p-4 rounded shadow-blue-600 shadow-2xl">
      <div className="flex gap-4 items-center">
		<img src="https://cdn-icons-png.freepik.com/512/9402/9402518.png" alt="" className="h-16 w-16 ml-[20px]"/>
		<h1 className="text-xl font-bold">Store Management</h1>
	  </div>

      <Box
        maxWidth="240px"
        style={{
          margin: "0 20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       
        <Switch
        
          onCheckedChange={() => setisdark(!isdark)}
          aria-label="Toggle theme"
        />

     
        <Card>
          <Flex gap="3" align="center">
           <Flex gap="3">
			 <Avatar
              size="3"
              src={user?.avatar || ""}
              radius="full"
              fallback={user?.name?.[0]?.toUpperCase() || "U"}
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                {user?.name }
              </Text>
              <Text as="div" size="2" color="gray">
                {user?.role}
              </Text>
            </Box>
		   </Flex>
			<Flex>
              <Logout/>
			</Flex>
          </Flex>
        </Card>
      </Box>
    </header>
  );
}

export default Header;

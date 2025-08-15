import Createuser from './userComponents/Createuser';
import gqlclient from '@/lib/services/gql';
import { getusers } from '@/lib/gql/queries';
import { user } from '../../generated/prisma';
import { Avatar, Box, Card, Flex, Text, Heading, Separator } from '@radix-ui/themes';
import Allproducts from './productComponents/Allproducts';
import Addproduct from './productComponents/Addproduct';
import Edituser from './userComponents/EdituserProfile';
import RemoveUser from './userComponents/RemoveUser';
async function Admin() {
  const data: { getalluser: user[] } = await gqlclient.request(getusers);
  const users = data.getalluser || [];

  return (
    <div className="p-6">
      <main className="flex gap-6">
      
        <div className="flex-1 space-y-6">
          <section>
            <Heading size="4" mb="3">Add Product</Heading>
            <Separator size="4" mb="4" />
            <Addproduct />
          </section>

          <section>
            <Heading size="4" mb="3">All Products</Heading>
            <Separator size="4" mb="4" />
            <Allproducts />
          </section>
        </div>

        
        <div className="w-[320px] flex flex-col gap-6">
          <section>
            <Heading size="4" mb="3">Create User</Heading>
            <Separator size="4" mb="4" />
            <Createuser />
          </section>

          <section className="flex-1 overflow-y-auto">
            <Heading size="4" mb="3">All Users</Heading>
            <Separator size="4" mb="4" />
            <div className="space-y-3">
              {users.map((val) => (
                <Box key={val.id}>
                  <Card>
                    <Flex gap="3" align="center" justify="between">
                     <Flex gap="2">
                       <Avatar
                        size="3"
                        src={""}
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
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Admin;

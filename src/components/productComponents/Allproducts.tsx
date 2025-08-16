'use client';
import { allproducts } from "@/lib/gql/queries";
import gqlclient from "@/lib/services/gql";
import { useEffect, useState } from "react";
import { Card, Box, Flex, Text, Avatar, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { product } from "../../../generated/prisma";
import Updateproduct from "./UpdateProduct";
import { Search } from "lucide-react";
import Searchprod from "./Searchprod";
function Allproducts() {
  const [products, setproducts] = useState<product[] |[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    async function getproduct() {
      const data:{getallproducts:product[]} = await gqlclient.request(allproducts);
      setproducts(data?.getallproducts || []);
    }
    setloading(false);
    getproduct();

  }, []);
if (loading) return <Text>Loading...</Text>;
  return (
    <div className="space-y-3">
     <div>
   <Searchprod prod={products} setprod={setproducts}/>

     </div>
      {products.map((val) => (
        <Box key={val.id}>
          <Card>
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src={val.img_url || ""}
                radius="full"
                fallback={val.title[0] || "P"}
              />
              <Box className="flex-1">
                <Text as="div" size="2" weight="bold">
                  {val.title}
                </Text>
                <Text as="div" size="2" color="gray">
                  ₹{val.price}
                </Text>
              </Box>
              <Link
                href={`/productdetail/${val.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View
              </Link>
            </Flex>
          </Card>
        </Box>
      ))}
    </div>
  );
}

export default Allproducts;

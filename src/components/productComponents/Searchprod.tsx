"use client";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Funnel, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { product } from "../../../generated/prisma";
import gqlclient from "@/lib/services/gql";
import { filtersearch } from "@/lib/gql/queries";

function Searchprod({
  prod,
  setprod,
}: {
  prod: product[];
  setprod: (x: product[] | []) => void;
}) {
  const [category, setcategory] = useState("others");
  const [sortbyprice, setsortbyprice] = useState("l-h");
  const [input, setinput] = useState("");

  async function getSearchProd() {
    try {
      const resp: { searchandfilterprod: product[] } = await gqlclient.request(
        filtersearch,
        {
          title: input,
          sort: sortbyprice,
          category,
        }
      );
      console.log(resp);
      setprod(resp?.searchandfilterprod || []);
    } catch (e: any) {
      console.log(e.message);
    }
  }
  return (
    <div className="flex gap-2">
      <TextField.Root
        placeholder="Search the docs…"
        value={input}
        onChange={(e) => setinput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && getSearchProd()}
      >
        <TextField.Slot>
          <Search />
        </TextField.Slot>
      </TextField.Root>
      <Button onClick={getSearchProd}>Search</Button>
      <Dialog.Root>
        <Dialog.Trigger>
          <button>
            <Funnel />
          </button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>filters</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Apply Filters
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <Select.Root
              value={sortbyprice}
              onValueChange={(value) => setsortbyprice(value)}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>SortBy Price</Select.Label>
                  <Select.Item value="l-h">Low-High</Select.Item>
                  <Select.Item value="h-l">High-Low</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <Select.Root
              value={category}
              onValueChange={(value) => setcategory(value)}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>category</Select.Label>
                  <Select.Item value="food">food</Select.Item>
                  <Select.Item value="beauty">beauty</Select.Item>
                  <Select.Item value="accessories">accessories</Select.Item>
                  <Select.Item value="clothing">clothing</Select.Item>
                  <Select.Item value="furniture">furniture</Select.Item>
                  <Select.Item value="decor">decor</Select.Item>
                  <Select.Item value="electronics">electronics</Select.Item>
                  <Select.Item value="others">others</Select.Item>
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
              <Button onClick={getSearchProd}>Apply</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export default Searchprod;

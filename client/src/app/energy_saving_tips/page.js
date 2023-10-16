"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "../sidebar";
import List from "./list";

export default function savingTips() {
  return (
    <ChakraProvider>
      <Sidebar children={<List />}></Sidebar>
    </ChakraProvider>
  );
}

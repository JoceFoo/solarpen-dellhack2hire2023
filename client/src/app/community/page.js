"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "../sidebar";
import Hub from "./hub";

export default function Communities() {
  return (
    <ChakraProvider>
      <Sidebar children={<Hub />}></Sidebar>
    </ChakraProvider>
  );
}

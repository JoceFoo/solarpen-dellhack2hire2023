'use client';

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard/dashboard";

function Home() {
  return (
    <ChakraProvider>
      <Sidebar children={<Dashboard />}/>
    </ChakraProvider>
  )
}

export default Home
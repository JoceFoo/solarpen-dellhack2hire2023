"use client";

import { Flex, Text, Box, useColorModeValue } from "@chakra-ui/react";
import { React } from "react";
import LineChart from "./lineChart";
import DoughnutChart from "./doughnutChart";

function Dashboard() {
  return (
    <Flex direction="column" align="center">
      <Text fontSize="38">Dashboard</Text>
      <Box bg={useColorModeValue("yellow.50")} align="center">
        <LineChart></LineChart>
      </Box>
      <Box mt={10} bg={useColorModeValue("yellow.50")} align="center">
        <DoughnutChart></DoughnutChart>
      </Box>
    </Flex>
  );
}

export default Dashboard;

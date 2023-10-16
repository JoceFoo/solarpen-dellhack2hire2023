'use client';

import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "../sidebar";
import { useSearchParams } from "next/navigation";
import { RewardsPage } from "./constants";
import Earn from "./earn";
import MyReward from "./myreward";
import Redeem from "./redeem";

export default function Page() {
    const params = useSearchParams();
    const type = params.get('type')
console.log(type)
    return (
        <ChakraProvider>
            <Sidebar children={
                type == RewardsPage.EARN.toLowerCase() 
                    ? <Earn /> 
                    : type == RewardsPage.MYREWARDS.toLowerCase() 
                        ? <MyReward /> 
                        : <Redeem />
            } />
        </ChakraProvider>
    )
}
'use client';

import Sidebar from '@/app/sidebar'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import Calculator from './calculator'
import { useSearchParams } from 'next/navigation';

function Page() {
  const params = useSearchParams();
  const buildingType = params.get('type');

  return (
    <ChakraProvider>
      <Sidebar children={<Calculator type={buildingType}/>}/>
    </ChakraProvider>
  )
}

export default Page
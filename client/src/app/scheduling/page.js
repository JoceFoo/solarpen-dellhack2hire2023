'use client';

import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from '../sidebar';
import Weather from './Weather';

const Page = () => {


  return (
    <ChakraProvider>
      <Sidebar children={<Weather />} />
    </ChakraProvider>
  );
};

export default Page;
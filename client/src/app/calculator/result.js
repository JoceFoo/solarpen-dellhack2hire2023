import { Card, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function Result({electricResult, solarResult, expectedSaving}) {
  return (
    <Flex mt='10' direction='column' align='center' justify='center'>
      <Text fontSize='2xl'>
        This is your estimated bill
      </Text>
      <Flex mt='10' gap='2rem'>
        <BillCard amount={electricResult.toFixed(2)} text='Estimated Electricity Bill' />
        <BillCard amount={solarResult.toFixed(2)} text='Estimated Solar Bill' />
        <BillCard amount={expectedSaving.toFixed(2)} text='Estimated savings' />
      </Flex>
      <Flex mt='28' gap='3rem'>
       
        

      </Flex>
    </Flex>
  )
}

function BillCard({ amount, text }) {
  return (
    <Card p='1rem' bg='yellow.200' w='210px' minH='175px' boxShadow='md' justify='space-between'>
      <Flex>
        <Text mr='5px'>
          RM
        </Text>
        <Text fontSize='2xl'>
          {amount}
        </Text>
      </Flex>
      <Text fontSize='sm'>{text}</Text>
    </Card>
  )
}
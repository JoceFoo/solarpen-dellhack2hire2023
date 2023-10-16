'use client';

import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';

function MyReward({ selectedRewards }) {
  // const router = useRouter();
  // const totalPoints  = router.state.totalPoints;
  const totalPoints = 0;
  return (
    <Flex direction="column" align="center" justify="start">
      <Text fontSize='2xl'>My Rewards</Text>
      <Text fontSize='xl'>Total points: {totalPoints}</Text>
      <Text fontSize='xl'>Your selected rewards:</Text>
      {/* {selectedRewards && selectedRewards.length>0?(
        selectedRewards.map((reward, index) => (
        <Text key={index}>
          {reward.name} - {reward.points} points
        </Text>  
      ))
      ) : (
        <Text>No rewards selected yet.</Text>
      )} */}
    </Flex> 
  );
}

export default MyReward;
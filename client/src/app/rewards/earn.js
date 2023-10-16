'use client'

import { useState, } from 'react';
import { Flex, Text, Button, Card, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import Image from "next/image";

// Custom component to display a point-earning action
function PointAction({ action, points, onAddPoints }) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text>{action}</Text>
      <Button size="md" colorScheme="teal" onClick={() => onAddPoints(points)}>+{points}</Button>
    </Flex>
  );
}

function MyReward({ selectedRewards }) { //havent done anything
  const router = useRouter();
  const totalPoints  = router.state.totalPoints;
}

function Earn() {
  const [totalPoints, setTotalPoints] = useState(0);

  const handleAddPoints = (pointsToAdd) => {
    setTotalPoints(totalPoints+pointsToAdd);
  }
  function Redeem(props) {
    const { type }=props;
    const [selectedRewards, setSelectedRewards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const squareStyle = {
    //   border: '1px solid #ccc',
    //   padding: '20px',
    //   borderRadius: '8px',
    //   margin: '10px',
    //   backgroundColor: '#A1EBFC'
    // };

    const rewardsTypes={
      vouchers:[
        {image: '/images/50voucher.jpg', name: 'RM 50 voucher', points: 5000},
        {image: '/images/100voucher.jpg', name: 'RM 100 voucher', points: 10000},
      ],
      items:[
        {image: '/images/humidifier.jpg', name: 'Humidifier', points: 1500}
      ]
    }
      
    const handleCardClick = (image, name, points) => {
      setSelectedRewards([...selectedRewards, { image, name, points }]);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false); // Close the modal
    };
  }

  function RewardsTypeItem({ image, name, points, onCardClick }){
    const handleCardClick=()=>{
      onCardClick(image, name, points);
    };
    return(
      <Card px='2' py='8' mx='12' my='8' w='100' h='350' cursor='pointer' textAlign='center' justify='space-between' onClick={handleCardClick}> 
        <Image src={image} width='200' height='200'/>
        <Text>
          {name}
          <br />
          {points}
        </Text>
      </Card>
    )
  }
  
  return (
    <Flex direction="column" align="center" justify="start">
      <Text fontSize='2xl'>Earn Points</Text>
      <div>
        <PointAction action="Daily check-in" points={10} onAddPoints={handleAddPoints} />
        <PointAction action="Purchase eco-friendly electric appliances" points={50} onAddPoints={handleAddPoints} />
        <PointAction action="Switch off all appliances in home" points={20} onAddPoints={handleAddPoints} />
        <PointAction action="Visit energy saving hub" points={15} onAddPoints={handleAddPoints} />
        <PointAction action="Provide helpful review" points={10} onAddPoints={handleAddPoints} />
        <PointAction action="Use eco-friendly electric appliances" points={20} onAddPoints={handleAddPoints} />
        <PointAction action="Answer a question and get points!" points={15} onAddPoints={handleAddPoints} />
        <PointAction action="Referring a new member to the community" points={30} onAddPoints={handleAddPoints} />
        <PointAction action="Celebrate Earth Day!" points={50} onAddPoints={handleAddPoints} />
        <PointAction action="Organizing a community event" points={20} onAddPoints={handleAddPoints} />
        <PointAction action="Sharing an informative article" points={5} onAddPoints={handleAddPoints} />
      </div>
      <Text>Total Points: {totalPoints}</Text>
      <br />
      <Text fontSize='2xl'>My Rewards</Text>
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
      <br />
      <Text fontSize='3xl'>Redeem Points</Text>
      <Text fontSize='x1'>Use your points to get fabulous treats!</Text>
        <Flex direction='row' align='center' justify='space-around'>
          {/* {Object.values(Redeem.rewardsTypes).map((rewardsType, index)=>
            // rewardsType = [[], []];
            Redeem.rewardsType.map((reward) => 
              <RewardsTypeItem key={index} image={reward.image} name={reward.name} points={reward.points} onCardClick={handleCardClick}/>
            )
          )} */}
        </Flex>
    </Flex>      
  );
}
export default Earn;
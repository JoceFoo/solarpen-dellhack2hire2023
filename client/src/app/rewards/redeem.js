'use client'

import { Flex, Text, Card, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { RewardsType } from './constants';
import { useState } from 'react';
import Image from "next/image";


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

  return (
    <Flex direction="column" align="center" justify="start">
      <Text fontSize='3xl'>Redeem Points</Text>
      <Text fontSize='x1'>Use your points to get fabulous treats!</Text>
        <Flex direction='row' align='center' justify='space-around'>
          {Object.values(rewardsTypes).map((rewardsType, index)=>
            // rewardsType = [[], []];
            rewardsType.map((reward) => 
              <RewardsTypeItem key={index} image={reward.image} name={reward.name} points={reward.points} onCardClick={handleCardClick}/>
            )
          )}
        </Flex>
      {/* Display the modal when an item is selected */}
      {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Item Selected</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedRewards[selectedRewards.length - 1].name} has been added to My Rewards.</Text>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </Flex>
   )
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
export default Redeem
'use client'

import { useState, } from 'react';
import { Flex, Text, Button, Box, WrapItem, Card, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, IconButton } from "@chakra-ui/react";
import Image from "next/image";
//import './rewards.css';
import { BsCalendar2Check, BsLightbulbOff, BsPeople } from "react-icons/bs";
import { ImEarth } from "react-icons/im";
import { GrGroup, GrCircleInformation } from "react-icons/gr";
import { MdOutlineEco, MdOutlineEnergySavingsLeaf, MdOutlineReviews, MdElectricalServices, MdQuestionMark,   } from "react-icons/md";

// Custom component to display a point-earning action
function PointAction({ icon, action, points, onAddPoints }) {
  return (
    <Flex direction='row' spacing={15} align='center' justify='space-between' gap='1rem' w='100%'>
      <Flex align='center' gap='1rem'>
        <IconButton icon={icon}/>
        <Text>{action}</Text>
      </Flex>
      <Button bg='Cyan' size='md'px='0' minW='60px' onClick={() => onAddPoints(points)}>+{points}</Button>
    </Flex>
  );
}

function MyReward({ selectedRewards }) { //havent done anything
  const totalPoints  = router.state.totalPoints;
}

function Redeem(props) {
  const { type }=props;
  const [selectedRewards, setSelectedRewards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Item Selected</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedRewards.length > 0 ? selectedRewards[selectedRewards.length - 1].name:'No reward selected yet.'} has been added to My Rewards.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
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

function Earn() {
  const [totalPoints, setTotalPoints] = useState(0);

  const handleAddPoints = (pointsToAdd) => {
    setTotalPoints(totalPoints+pointsToAdd);
  }
  
  return (
    <Flex direction="column" align="start" justify="start" gap='1rem' ml='5rem' mr='15rem'>
      <Text fontSize='3xl' alignSelf='center'>Earn Points</Text>
      <Text fontSize='xl' alignSelf='center'>Earn Points by completing the missions!</Text>
        <PointAction icon={<BsCalendar2Check />} action="Daily check-in" points={10} onAddPoints={handleAddPoints} />
        <PointAction icon={<MdOutlineEco />} action="Purchase eco-friendly electric appliances" points={50} onAddPoints={handleAddPoints} />
        <PointAction icon={<BsLightbulbOff />} action="Switch off all appliances in home" points={20} onAddPoints={handleAddPoints} />
        <PointAction icon={<MdOutlineEnergySavingsLeaf />} action="Visit energy saving hub" points={15} onAddPoints={handleAddPoints} />
        <PointAction icon={<MdOutlineReviews />} action="Provide helpful review" points={10} onAddPoints={handleAddPoints} />
        <PointAction icon={<MdElectricalServices />} action="Use eco-friendly electric appliances" points={20} onAddPoints={handleAddPoints} />
        <PointAction icon={<MdQuestionMark />} action="Answer a question and get points!" points={15} onAddPoints={handleAddPoints} />
        <PointAction icon={<BsPeople />} action="Referring a new member to the community" points={30} onAddPoints={handleAddPoints} />
        <PointAction icon={<ImEarth />} action="Celebrate Earth Day!" points={50} onAddPoints={handleAddPoints} />
        <PointAction icon={<GrGroup />} action="Organizing a community event" points={20} onAddPoints={handleAddPoints} />
        <PointAction icon={<GrCircleInformation />} action="Sharing an informative article" points={5} onAddPoints={handleAddPoints} />
      <Text>Total Points: {totalPoints}</Text>
      <br />
      <Text fontSize='3xl' alignSelf='center'>My Rewards</Text>
      <Text fontSize='xl' alignSelf='center'>Your selected rewards:</Text>
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
      <Redeem rewardsTypes></Redeem>

    </Flex>       
  );
}
export default Earn;
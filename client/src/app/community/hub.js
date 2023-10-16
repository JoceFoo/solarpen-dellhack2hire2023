"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  Stack,
  Avatar,
  useDisclosure,
  IconButton,
  Button,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  PopoverArrow,
  ButtonGroup,
  Textarea,
} from "@chakra-ui/react";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
  BsHandThumbsDown,
  BsHandThumbsUp,
  BsChatDots,
} from "react-icons/bs";

export default function Hub() {
  return (
    <Flex>
      <EventCard 
        eventImgSrc= "https://previews.123rf.com/images/usbfco/usbfco1601/usbfco160100025/50591974-cute-cartoon-earth-isolated-on-white.jpg?fj=1"
        userImgSrc= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6eHwFN4FvpHarYUpc6YZ0E6UJI5ArmZYXhATPa0rEe66uX0be1wbyBoEIZwLXSafSY4Y&usqp=CAU"
        username= "Aliluya"
        date= "Oct 16, 2023"
        tag= "Savings Tips"
        title= "Energy Tips 1"
        content= "Be sure to off any electrical appliances after used"
        likes= {12}
        dislikes= {1}
      />
      <EventCard 
        eventImgSrc= "https://as1.ftcdn.net/v2/jpg/01/29/54/78/1000_F_129547832_nLJNbxRaTAOiV7MqtfFEFSOHymMKipdM.jpg"
        userImgSrc= "https://howtodrawforkids.com/wp-content/uploads/2022/11/how-to-draw-a-baby-penguin.jpg"
        username= "Penguin 123"
        date= "Oct 16, 2023"
        tag= "Event"
        title= "Earth Hour"
        content= "Penguins baby don't have place to stay. Help them out!!"
        likes= {200}
        dislikes= {17}
      />
      
    </Flex>
  );
}

function EventCard({ eventImgSrc, userImgSrc, username, date, tag, tagColor, title, content, likes, dislikes }) {
  const { onClose, isOpen, onOpen } = useDisclosure()
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <Center py={6}>
      <Box
        w="xs"
        h="500"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderRadius={"20px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Img
            src={eventImgSrc}
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            userSelect="none"
          />
        </Box>
        <Box p={4}>
          <Flex align={"center"}>
            <Avatar
              mr="2"
              mb="2"
              src={userImgSrc}
              userSelect="none"
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>{ username }</Text>
              <Text color={"gray.500"}>{ date }</Text>
            </Stack>
          </Flex>
          <Box
            bg={tagColor ? tagColor : "#b5e2ff"}
            display={"inline-block"}
            px={2}
            py={1}
            color="black"
            mb={4}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              { tag }
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            { title }
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            { content }
          </Text>
        </Box>
        <Flex align="center">
          <Flex p={4} cursor="pointer" onClick={() => setLiked(!liked)}>
            {liked
              ? <BsFillHandThumbsUpFill fill="blue" fontSize="20" />
              : <BsHandThumbsUp fontSize="20" />}
            <Text ml="3" userSelect="none">
              { likes + liked } likes
            </Text>
          </Flex>
          <Flex p={4} cursor="pointer" onClick={() => setDisliked(!disliked)}>
            {disliked
              ? <BsFillHandThumbsDownFill fill="blue" fontSize="20" />
              : <BsHandThumbsDown fontSize="20" />}
            <Text ml="3" userSelect="none">
              { dislikes + disliked } dislikes
            </Text>
          </Flex>
          <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={false} >
              <PopoverTrigger>
                <IconButton
                  variant="outlined"
                  onClick={onOpen}
                  icon={<BsChatDots fontSize={"20px"} />}
                  />
              </PopoverTrigger>
            
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">
                  Comment
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Textarea placeholder="Write something..." />
                </PopoverBody>
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <ButtonGroup size="sm">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button colorScheme="red" onClick={onClose}>Post</Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
        </Flex>
      </Box>
    </Center>
  )
}
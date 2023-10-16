'use client'

import React, { useCallback, useState } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'
import {
  FiHome,
  FiClock,
  FiPlus,
  FiUsers,
  FiGift,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi'
import {
  CiHome,
  CiTimer,
  CiCalculator1,
  CiUser,
  CiGift,
  CiDollar,
  CiChat2,
} from 'react-icons/ci'
import {
  MdOutlineTipsAndUpdates,
} from 'react-icons/md'
import { useRouter, useSearchParams } from 'next/navigation';
import { BuildingType } from './calculator/constant'
import { RewardsPage } from './rewards/constants'

const LinkItems = [
  { name: 'Home', icon: CiHome, path: '/' },
  { name: 'Scheduling', icon: CiTimer, path: '/' },
  {
    name: 'Calculator', icon: CiCalculator1,
    subitems: [
      { name: 'Domestic', icon: null, path: '/calculator' },
      { name: 'Commercial', icon: null, path: '/calculator' },
      { name: 'Industrial', icon: null, path: '/calculator' },
    ],
  },
  {
    name: 'Communities', icon: FiPlus,
    subitems: [
      { name: 'Forum', icon: null, path: '/community' },
    ],
  },
  {
    name: 'Rewards',
    icon: CiGift,
    subitems: [
      { name: RewardsPage.EARN, icon: null, path: '/rewards' },
      { name: RewardsPage.MYREWARDS, icon: null, path: '/rewards' },
      { name: RewardsPage.REDEEM, icon: null, path: '/rewards' },
    ],
  },
  {
    name: 'Tips',
    icon: MdOutlineTipsAndUpdates,
    subitems: [
      { name: 'Energy Saving Tips', icon: null, path: '/energy_saving_tips' },
    ],
  },
];


// content as props
// @params({ children: 'ReactNode' })
function Sidebar({ ...props }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('#FFFFE1', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
        { props.children }
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          SolarPen
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} subitems={link.subitems} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, subitems, path, ...rest }) => {
  const router = useRouter();  
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const createQueryString = useCallback((key, value) => {
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set(key, value);
    return urlParams.toString();
  }, [searchParams])

  const toggleClick = () => {
    if (subitems) {
      setIsExpanded(!isExpanded);
    } else {
      if (children.props) {
        const subItem = children.props.children;
        if (BuildingType.hasOwnProperty(subItem.toUpperCase()) || Object.values(RewardsPage).includes(subItem)) {
          router.push(path + '?' + createQueryString('type', subItem.toLowerCase()));
          return;
        }
      }
      router.push(path);
    }
  };

  return (
    <Box as="div" _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        borderBottom={(subitems && isExpanded) ? '1px' : '0'}
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        onClick={toggleClick} // Toggle subitem visibility
        userSelect='none'
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
        {subitems && (<Icon
          as={FiChevronDown} // Toggle icon based on expansion state
          ml="auto"
          transition="transform 0.3s ease-in-out" // CSS transition for icon rotation
          transform={isExpanded ? 'rotate(-180deg)' : 'rotate(0deg)'}
        />)}
      </Flex>

      {isExpanded && subitems && (
        <Box
          overflow='hidden'
          transition='max-height 0.5s, opacity 0.3s'
          // maxH={isExpanded ? '100px' : '0'}
          opacity={isExpanded ? '1' : '0'}
          ml="4">
          {subitems.map((subitem) => (
            <NavItem key={subitem.name} icon={subitem.icon} path={subitem.path}>
              <Text fontSize='sm'>
                {subitem.name}
              </Text>
            </NavItem>
          ))}
        </Box>
      )}
    </Box>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  )
}

export default Sidebar
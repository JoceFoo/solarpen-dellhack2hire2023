import React from 'react';
import { appliances, categories } from './tips';
import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';

function List() {
  return (
    <Box>
      {categories.map((category) => (
        <Accordion allowToggle key={category}>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Heading fontSize="xl" flex="1">
                      {category}
                    </Heading>
                    <Text fontSize="lg" color={isExpanded ? 'blue.500' : 'gray.600'}>
                      {isExpanded ? '▲' : '▼'}
                    </Text>
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <ul>
                    {appliances
                      .filter((appliance) => appliance.category === category)
                      .map((appliance) => (
                        <li key={appliance.id}>
                          <h3>{appliance.name}</h3>
                          <ul>
                            {appliance.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                  </ul>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
}

export default List;

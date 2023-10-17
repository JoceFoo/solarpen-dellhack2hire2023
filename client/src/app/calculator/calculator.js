import { Box, Button, Card, Flex, Input, SlideFade, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BuildingType } from './constant'
import { FiSun } from 'react-icons/fi';
import Result from './result';

export default function Calculator(props) {
  // type = domestic, commercial, industrial 
  const { type } = props;
  const [selectedType, setSelectedType] = useState(null);
  const [electricity, setElectricity] = useState(0);
  const [solarEnergy, setSolarEnergy] = useState(0);
  const [showCalculate, setShowCalculate] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [electricalResult, setElectricalResult] = useState(0);
  const [solarResult, setSolarResult] = useState(0);
  const [expectedSaving, setExpectedSaving] = useState(0);

  const buildingTypes = {
    domestic: [],
    commercial: [
      { name: 'Low Voltage (Tariff D)', icon: null },
      { name: 'Medium Voltage (Tariff E1)', icon: null },
      { name: 'Medium Voltage (Tariff E2)', icon: null },
    ],
    industrial: [
      { name: 'Low Voltage (Tariff D)', icon: null },
      { name: 'Medium Voltage (Tariff E1)', icon: null },
      { name: 'Medium Voltage (Tariff E2)', icon: null },
      { name: 'High Voltage (Tariff E3)', icon: null },
    ]
  }

  useEffect(() => {
    if (buildingTypes.hasOwnProperty(type.toLowerCase()) && buildingTypes[type.toLowerCase()].length > 0) {
      setSelectedType(null);
    } else {
      setSelectedType(type)
    }
    setShowResult(false);
  }, [type])

  const electricityOnChange = (val) => {
    if (val < 3) {
      val = 3
    }
    if (val > 9999) {
      val = 9999
    }
    setElectricity(val);
    setShowCalculate(true);
  }

  const solarOnChange = (val) => {
    if (val < 0) {
      val = 0
    }
    if (val > 9999) {
      val = 9999
    }
    setSolarEnergy(val);
    setShowCalculate(true);
  }

  const calculateElectricityBill = (amount, skipMinimum) => {
    let total = 0;
    switch (selectedType) {
      case BuildingType.DOMESTIC.toLowerCase():
        if (amount <= 200) {
          total = (amount * 0.218);
        } else if (amount <= 300) {
          total = (200 * 0.218 + (amount - 200) * 0.334);
        } else if (amount <= 600) {
          total = (200 * 0.218 + 100 * 0.334 + (amount - 300) * 0.516);
        } else if (amount <= 900) {
          total = (200 * 0.218 + 100 * 0.334 + 300 * 0.516 + (amount - 600) * 0.546);
        } else {
          total = (200 * 0.218 + 100 * 0.334 + 300 * 0.516 + 300 * 0.546 + (amount - 900) * 0.571);
        }
        break;

      case buildingTypes.commercial[0].name:
        if (amount <= 200) {
          if (amount * 0.435 < 7.2) {
            total = (7.2)
          } else {
            total = (amount * 0.435);
          }
        } else {
          total = (200 * 0.435 + (amount - 200) * 0.445);
        }
        break;

      case buildingTypes.commercial[1].name:
        total = (amount * 0.365);
        if (skipMinimum) break;
        if (total < 600) {
          total = (600);
        }
        break;

      case buildingTypes.commercial[2].name:
        total = (amount * 0.295);
        if (skipMinimum) break;
        if (total < 600) {
          total = (600);
        }
        break;

      case buildingTypes.industrial[0].name:
        if (amount <= 200) {
          if (amount * 0.380 < 7.2) {
            total = (7.2);
          } else {
            total = (amount * 0.380);
          }
        } else {
          total = (200 * 0.380 + (amount - 200) * 0.441);
        }
        break;

      case buildingTypes.industrial[1].name:
        total = (amount * 0.337);
        if (skipMinimum) break;
        if (total < 600) {
          total = (600);
        }
        break;

      case buildingTypes.industrial[2].name:
        total = (amount * 0.287);
        if (skipMinimum) break;
        if (total < 600) {
          total = (600);
        }
        break;

      case buildingTypes.industrial[3].name:
        total = (amount * 0.295);
        if (skipMinimum) break;
        if (total < 600) {
          total = (600);
        }
        break;

      default:
        break;
    }
    return total;
  }

  const calculateSolarBill = (amount) => {
    if (amount <= 200) {
      return (amount * 0.218);
    } else if (amount <= 300) {
      return (200 * 0.218 + (amount - 200) * 0.334);
    } else if (amount <= 600) {
      return (200 * 0.218 + 100 * 0.334 + (amount - 300) * 0.516);
    } else if (amount <= 900) {
      return (200 * 0.218 + 100 * 0.334 + 300 * 0.516 + (amount - 600) * 0.546);
    } else {
      return (200 * 0.218 + 100 * 0.334 + 300 * 0.516 + 300 * 0.546 + (amount - 900) * 0.571);
    }
  }

  const calculateResult = () => {
    setElectricalResult(calculateElectricityBill(electricity, false));
    setSolarResult(calculateSolarBill(solarEnergy));
    setExpectedSaving(calculateElectricityBill(solarEnergy, true));

    setShowResult(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.clientHeight, behavior: 'smooth' });
    }, 100);
  }

  return (
    <Flex direction='column' align='center' minH={showResult ? '200vh' : null}>
      <Flex direction='column' align='center' id='calculator-input' minH={showResult ? '100vh' : null}>
        <Text fontSize='3xl'>Energy Usage Calculator ({type[0].toUpperCase() + type.substring(1)})</Text>

        {BuildingType.hasOwnProperty(type.toUpperCase()) && buildingTypes[type.toLowerCase()].length > 0 && (
          <Flex direction='column' align='center'>
            <Text fontSize='xl'>Select Your Building Type: </Text>
            <Flex direction='row' align='stretch' justify='space-around'>
              {buildingTypes[type.toLowerCase()].map((buildingType, index) => {
                return <BuildingTypeItem key={index} {...buildingType} selected={selectedType} onSelect={setSelectedType} />
              })}
            </Flex>
          </Flex>
        )}

        <SliderBill title={'Insert your monthly electricity'} isOpen={selectedType != null} sliderValue={electricity} setSliderValue={electricityOnChange} />
        <SliderBill title={'Insert your monthly solar energy'} isOpen={selectedType != null} sliderValue={solarEnergy} setSliderValue={solarOnChange} />
        <CalculateButton isOpen={selectedType != null && showCalculate} onClick={calculateResult} />
      </Flex>
      {showResult && (<Result solarResult={solarResult} electricResult={electricalResult} expectedSaving={expectedSaving}/>)}
    </Flex>
  )
}

function BuildingTypeItem({ name, selected, onSelect }) {
  return (
    <Card
      px='2'
      minH='120px'
      m='1rem'
      cursor='pointer'
      userSelect='none'
      _hover={selected === name ? null : { bg: 'cyan.50' }}
      bg={selected === name ? 'cyan.400' : 'white'}
      textColor={selected === name ? 'white' : 'black'}
      onClick={() => onSelect(name)}
    >
      <Text my='auto'>{name}</Text>
    </Card>
  )
}

function SliderBill({ title, isOpen, sliderValue, setSliderValue }) {

  return (
    <SlideFade in={isOpen} offsetY='20px' style={{ width: '70%' }}>
      <Flex direction='column' align='center' mt='2rem'>
        <Flex align='center' justify='center' mb='1.75rem'>
          <Text mr='1rem'>{title}</Text>
          <Input
            value={sliderValue}
            variant='flushed'
            textAlign='center'
            width='60px'
            size='sm'
            onChange={(event) => setSliderValue(event.target.value)}
          />
        </Flex>
        <Flex w='100%' align='center'>
          <Slider value={sliderValue} min={3} max={9999} step={1} onChange={(val) => setSliderValue(val)}>
            <SliderMark
              value={sliderValue}
              textAlign='center'
              color='black'
              mt='-10'
              ml='-6'
              w='12'
            >
              {sliderValue}
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack bg='orange' />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color='orange' as={FiSun} />
            </SliderThumb>
          </Slider>
          <Text fontSize='sm' ml='1rem'>kWh</Text>
        </Flex>
      </Flex>
    </SlideFade>
  )
}

function CalculateButton({ isOpen, onClick }) {
  return (
    <SlideFade in={isOpen} >
      <Button
        mt='4rem'
        bg='yellow.200'
        shadow='md'
        border='1px'
        borderColor='yellow.300'
        _hover={{ bg: 'yellow.300' }}
        onClick={onClick}
      >
        Calculate!
      </Button>
    </SlideFade>
  )
}